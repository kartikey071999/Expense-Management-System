from pydantic import BaseModel, Field, validator
from typing import Optional
import re

class Expense(BaseModel):
    description: str = Field(..., max_length=50)
    amount: float = Field(..., ge=0)
    category: str = Field(...)

    @validator('amount')
    def validate_amount(cls, v):
        if not re.match(r'^\d+(\.\d{1,2})?$', str(v)):
            raise ValueError('amount must not contain more than 2 digits after the decimal point')
        return v

    @validator('description')
    def validate_description_length(cls, v):
        word_count = len(v.split())
        if word_count > 50:
            raise ValueError('description must be less than 50 words')
        return v
