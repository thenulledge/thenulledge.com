#!/bin/bash
# Convert Netlify _redirects to nginx rewrite rules

REDIRECTS_FILE="dist/_redirects"
NGINX_REDIRECTS_FILE="dist/_redirects.conf"

if [ -f "$REDIRECTS_FILE" ]; then
    echo "# Auto-generated from _redirects" > "$NGINX_REDIRECTS_FILE"
    
    while IFS= read -r line; do
        # Skip comments and empty lines
        if [[ "$line" =~ ^#.*$ ]] || [[ -z "$line" ]]; then
            continue
        fi
        
        # Parse: /old-path /new-path [status]
        read -r from to status <<< "$line"
        
        # Only handle 301 redirects (permanent)
        if [[ "$status" == "301" ]]; then
            # Escape dots for nginx regex (but not slashes)
            from_escaped=$(echo "$from" | sed 's/\./\\./g')
            # Use https://$host to preserve domain (hardcoded https since $scheme can be unreliable in rewrites)
            echo "rewrite ^${from_escaped}(/.*)?$ https://\$host${to}\$1 permanent;" >> "$NGINX_REDIRECTS_FILE"
        fi
    done < "$REDIRECTS_FILE"
    
    echo "Generated nginx redirects: $NGINX_REDIRECTS_FILE"
fi
