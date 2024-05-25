from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

import models
import database

app = FastAPI()

# Dependency for getting database session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Importing models here so that we can create tables
from models import Expense

# Create tables
database.Base.metadata.create_all(bind=database.engine)

@app.post("/expenses/", response_model=Expense)
def create_expense(expense: Expense, db: Session = Depends(get_db)):
    db_expense = models.Expense(**expense.dict())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.get("/expenses/", response_model=List[Expense])
def read_expenses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Expense).offset(skip).limit(limit).all()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
