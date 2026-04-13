#!/bin/bash
# Verify that every public function in the comm-chat codebase
# has its actual code shown in the logic map annotations.
#
# Usage: ./scripts/verify-coverage.sh [path-to-comm-chat-src]

COMM_CHAT_SRC="${1:-$HOME/Desktop/projects/comm-chat-email-triage/src}"
ANNOTATIONS="$(dirname "$0")/../src/data/code-annotations.ts"

if [ ! -d "$COMM_CHAT_SRC" ]; then
    echo "ERROR: comm-chat source not found at $COMM_CHAT_SRC"
    exit 1
fi

if [ ! -f "$ANNOTATIONS" ]; then
    echo "ERROR: annotations file not found at $ANNOTATIONS"
    exit 1
fi

# Extract all public function names from Rust source
# Skip: mod.rs, schema.rs, models.rs, types.rs, lib.rs, app.rs (structural, not business logic)
RUST_FUNCS=$(grep -rn "pub async fn\|pub fn" "$COMM_CHAT_SRC" --include="*.rs" \
    | grep -v "/mod.rs:" \
    | grep -v "schema.rs:" \
    | grep -v "models.rs:" \
    | grep -v "types.rs:" \
    | grep -v "lib.rs:" \
    | grep -v "app.rs:" \
    | grep -v "login_page.rs:" \
    | grep -v "thread_sidebar.rs:" \
    | sed 's/.*pub \(async \)\{0,1\}fn \([a-z_]*\).*/\2/' \
    | sort -u)

# Extract function names that appear in code blocks in annotations
ANNOTATED_FUNCS=$(grep -oE "pub (async )?fn [a-z_]+" "$ANNOTATIONS" \
    | sed 's/pub async fn //;s/pub fn //' \
    | sort -u)

RUST_COUNT=$(echo "$RUST_FUNCS" | wc -l | tr -d ' ')
ANNOTATED_COUNT=$(echo "$ANNOTATED_FUNCS" | wc -l | tr -d ' ')

# Find missing
MISSING=$(comm -23 <(echo "$RUST_FUNCS") <(echo "$ANNOTATED_FUNCS"))
MISSING_COUNT=$(echo "$MISSING" | grep -c '[a-z]')

# Group missing by source file
echo "========================================"
echo "LOGIC MAP COVERAGE REPORT"
echo "========================================"
echo ""
echo "Total public functions in codebase: $RUST_COUNT"
echo "Functions with code in annotations: $ANNOTATED_COUNT"
echo "Missing from annotations:           $MISSING_COUNT"
echo ""

if [ "$MISSING_COUNT" -eq 0 ]; then
    echo "PASS - All functions are annotated"
    exit 0
fi

echo "MISSING FUNCTIONS (grouped by file):"
echo "----------------------------------------"

# For each missing function, find which file it's in
echo "$MISSING" | while read -r func; do
    if [ -z "$func" ]; then continue; fi
    FILE=$(grep -rn "pub \(async \)\{0,1\}fn ${func}(" "$COMM_CHAT_SRC" --include="*.rs" \
        | grep -v "/mod.rs:" \
        | grep -v "schema.rs:" \
        | grep -v "models.rs:" \
        | grep -v "types.rs:" \
        | head -1 \
        | sed "s|$COMM_CHAT_SRC/||" \
        | cut -d: -f1)
    echo "  $FILE :: $func"
done | sort

echo ""
echo "To fix: add code blocks with 'pub fn <name>' or 'pub async fn <name>'"
echo "        to src/data/code-annotations.ts"
