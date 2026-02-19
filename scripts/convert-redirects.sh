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
            # Escape special characters for nginx regex
            from_escaped=$(echo "$from" | sed 's/\./\\./g' | sed 's/\//\\\//g')
            to_escaped=$(echo "$to" | sed 's/\//\\\//g')
            echo "rewrite ^$from_escaped(/.*)?$ $to_escaped\$1 permanent;" >> "$NGINX_REDIRECTS_FILE"
        fi
    done < "$REDIRECTS_FILE"
    
    echo "Generated nginx redirects: $NGINX_REDIRECTS_FILE"
fi
