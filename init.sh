#!/bin/bash
curl -fsSL https://deno.land/x/install/install.sh | sh
export DENO_INSTALL="/home/gitpod/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
echo "----------DONE-----------"
