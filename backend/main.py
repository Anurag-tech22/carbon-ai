from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from . import models
from .database import engine
from .routers import calculator, dashboard, recommendations, coach, auth_router
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

# Initialize Rate Limiter
limiter = Limiter(key_func=get_remote_address, default_limits=["100/minute"])

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Carbon Compass AI API",
    description="Backend API for the Carbon Compass application",
    version="1.0.0"
)

# Custom Security Headers Middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response

app.add_middleware(SecurityHeadersMiddleware)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Configure strict CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "https://carbon-compass-six-chi.vercel.app"
    ], # Strict origins for security scanners
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include routers
app.include_router(calculator.router)
app.include_router(dashboard.router)
app.include_router(recommendations.router)
app.include_router(coach.router)
app.include_router(auth_router.router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to Carbon Compass AI API"}
