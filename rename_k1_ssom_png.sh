#!/bin/bash
# Rename all k1_ssom_*.png files to ssom_k1_*.png in the current directory

for f in k1_ssom_*.png; do
    if [[ -f "$f" ]]; then
        newname="ssom_k1_${f#k1_ssom_}"
        mv "$f" "$newname"
    fi
done
