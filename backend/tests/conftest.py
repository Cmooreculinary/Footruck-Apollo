import os

# Tests sign their own session tokens; give them an explicit test-only key
# instead of relying on a production fallback.
os.environ.setdefault("JWT_SECRET", "test-only-jwt-secret")
