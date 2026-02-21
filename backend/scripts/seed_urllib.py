import urllib.request
import json

def seed():
    url = "http://localhost:8000/api/v1/auth/register"
    payload = {
        "email": "investor@test.com",
        "password": "password123",
        "full_name": "Peak Ventures",
        "role": "investor"
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, content_type='application/json')
    req.add_header('Content-Type', 'application/json')
    
    try:
        with urllib.request.urlopen(req) as response:
            if response.getcode() == 201:
                print("User investor@test.com created successfully via API.")
            else:
                print(f"Server returned status: {response.getcode()}")
    except urllib.error.HTTPError as e:
        if e.code == 409:
            print("User investor@test.com already exists.")
        else:
            print(f"HTTP Error: {e.code} - {e.read().decode()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    seed()
