from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_projects_endpoint_returns_data_without_database():
    response = client.get('/api/projects')
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_resume_endpoint_serves_pdf_download():
    response = client.get('/api/resume', follow_redirects=False)
    assert response.status_code == 200
    assert 'application/pdf' in response.headers.get('content-type', '')
