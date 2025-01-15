FROM python:3.9.18-slim-bookworm

ENV PYTHONUNBUFFRED=1

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt

COPY . .



