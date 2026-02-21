import requests
import json

def seed():
    url = "http://localhost:8000/api/v1/auth/register"
    payload = {
        "email": "investor@test.com",
        "password": "password123",
        "full_name": "Peak Ventures",
        "role": "investor"
    }
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers)
        if response.status_code == 201:
            print("User investor@test.com created successfully via API.")
        elif response.status_code == 409:
            print("User investor@test.com already exists.")
        else:
            print(f"Failed to create user: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error connecting to API: {e}")

if __name__ == "__main__":
    seed()
