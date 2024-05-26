# schemas.py
from pydantic import BaseModel

class ExpenseBase(BaseModel):
    name: str
    amount: float

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int

    class Config:
        orm_mode = True
