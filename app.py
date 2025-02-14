from flask import Flask, render_template, request,json
import requests
import jinja2

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/accident", methods=['POST', 'GET'])
def accident():
    location = None
    destination = None
    location_details = []
    destination_details = []

    if request.method == "POST":
        location = request.form.get('location')
        destination = request.form.get('destination')

        # Fetch location details
        location_details = search_location(location)
        if location_details:
            location_details = location_details[0]  # Use only the first result

        # Fetch destination details
        destination_details = search_location(destination)
        if destination_details:
            destination_details = destination_details[0]  # Use only the first result

        return render_template(
            'details.html',
            location=location,
            destination=destination,
            location_details=location_details,
            destination_details=destination_details
        )

    return render_template('details.html', location=location, destination=destination)


def search_location(query):
    url = "https://nominatim.openstreetmap.org/search"
    params = {'q': query, 'format': 'json'}

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        results = response.json()
        return results if results else []  # Return an empty list if no results
    except requests.exceptions.RequestException as e:
        print(f"Error fetching location data: {e}")
        return []

if __name__ == "__main__":
    app.run(debug=True)
