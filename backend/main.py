from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes.items import router as items_router
from routes.analytics import router as analytics_router
from routes.quiz import router as quiz_router
from routes.users import router as users_router
from routes.news import router as news_router
from db import close_db

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/scripts", StaticFiles(directory="scripts"), name="scripts")

# Include routers with consistent prefixes
app.include_router(items_router, prefix="/items")
app.include_router(analytics_router, prefix="/analytics")
app.include_router(quiz_router, prefix="/quiz")
app.include_router(users_router, prefix="/users")
app.include_router(news_router, prefix="/news")

# Remove redundant /home endpoint
@app.on_event("shutdown")
def shutdown_event():
    close_db()