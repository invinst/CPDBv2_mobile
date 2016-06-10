!#/usr/bin/env bash
for f in `find . -name '*.js'`; do
    echo $f
    `python convert.py add $f`
    `lebab "${f}.out" -o "${f}.out"
    `python convert.py remove "${f}.out"
    `rm "${f}.out"`
done;
