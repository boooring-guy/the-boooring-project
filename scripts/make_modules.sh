#!/bin/bash
# Simple Script that makes modules for projects in modules folder
#  this is simple pattern i follow
#  Please refer other shell scripts for other patterns I follow in differnet projects or contexts

# My Module Pattern is very simple
# My usual module is usually feature based
#  If some logic or components are scoped to particular feature it doesn't make sense to put it in global scope, so I move them to feature scope.
# My module in nextjs project appears like
#  modules
    # - <feature_name>
    #     - ui
    #         - views
    #         - components
    #     - hooks
    #     - actions
    #     - api
    #     - data
    #     - utils
    #     - types
    #     - styles (rare for nextjs)
#  using all folders at all features is not mandatory, it is just a pattern I follow based on this I am writing the scripts with this pattern in mind, some of the folders will be created on default and some will be enabled by flags




# usage
#  ./make_module.sh feature_name --flags sa -> will generate feature_name with ui(views, components), hooks, types, actions

# Exit on error, undefined vars, and pipe failures
set -euo  pipefail

# get the directory of the script for relative releative paths
readonly SRC_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# Colors for better UX
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly NC='\033[0m' # No Color


log() { echo -e "${GREEN}[INFO]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }


log
