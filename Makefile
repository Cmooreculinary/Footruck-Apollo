PYTHON ?= python3.11
VENV := backend/.venv

.PHONY: setup install-frontend install-backend frontend backend test build clean

setup: install-frontend install-backend
	test -f frontend/.env || cp frontend/.env.example frontend/.env
	test -f backend/.env || cp backend/.env.example backend/.env

install-frontend:
	npm --prefix frontend install --legacy-peer-deps

install-backend:
	$(PYTHON) -m venv $(VENV)
	$(VENV)/bin/pip install -r backend/requirements.txt

frontend:
	npm --prefix frontend run dev

backend:
	cd backend && .venv/bin/uvicorn server:app --reload --port 8000

test:
	$(VENV)/bin/pytest -q backend/tests

build:
	npm --prefix frontend run build

clean:
	rm -rf frontend/build frontend/node_modules $(VENV) .pytest_cache backend/.pytest_cache
