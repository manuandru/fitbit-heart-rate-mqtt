FROM python:3.13.2-alpine3.21

# Websocket server port
EXPOSE 7890

WORKDIR /app

COPY requirements.txt main.py /app/

RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "-u", "main.py" ]
