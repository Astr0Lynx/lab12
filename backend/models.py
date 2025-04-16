from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)

class Item(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str  # Changed from int to str
    description: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    username: str
    bio: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}