#!/usr/bin/env python3
"""
Simple HTTP server to serve the integrated dashboard
Usage: python3 serve.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
DASHBOARD_FILE = "dashboard.html"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def log_message(self, format, *args):
        # Custom logging to make it cleaner
        print(f"📡 {self.address_string()} - {format % args}")

def main():
    # Change to the directory containing this script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Check if dashboard.html exists
    if not os.path.exists(DASHBOARD_FILE):
        print(f"❌ Error: {DASHBOARD_FILE} not found in current directory")
        sys.exit(1)
    
    print("🚀 Starting Integrated Dashboard Server...")
    print(f"📁 Serving from: {os.getcwd()}")
    
    # Create server
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        server_url = f"http://localhost:{PORT}"
        dashboard_url = f"{server_url}/{DASHBOARD_FILE}"
        
        print(f"✅ Server running at: {server_url}")
        print(f"🎯 Dashboard URL: {dashboard_url}")
        print(f"🌐 Opening dashboard in browser...")
        print(f"💡 Press Ctrl+C to stop the server")
        print("-" * 60)
        
        # Open browser automatically
        webbrowser.open(dashboard_url)
        
        # Start serving
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            print("👋 Thanks for using the Integrated Dashboard!")

if __name__ == "__main__":
    main()
