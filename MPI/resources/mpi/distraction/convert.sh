#!/bin/bash

for file in *.m4v; do
    filename=$(basename -- "$file")
    filename="${filename%.*}"
    output="${filename}.gif"
    ffmpeg -i "$file" -vf "fps=10,scale=320:-1:flags=lanczos" -c:v gif "$output"
done