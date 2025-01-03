## Step 1: Configure Your Domain DNS
Login to Your Domain Registrar
Access the control panel where you manage your domain (e.g., Namecheap, GoDaddy, etc.).

Add an A Record
Create a DNS A record pointing your domain to the IP address of your server.

Type: A
Host: @ (or the desired subdomain, e.g., www)
Value: 160.191.163.33 (your server's public IP)
TTL: Default or 1 hour

```
A   @   160.191.163.33
A   www 160.191.163.33
```
Wait for DNS Propagation
DNS changes can take some time to propagate (typically a few minutes to a few hours).

## Step 2: Install and Configure a Reverse Proxy (NGINX)
To route traffic from your domain to the Kubernetes NodePort, set up a reverse proxy on your server.

### Install NGINX:
```
sudo apt update
sudo apt install nginx
```

### Configure NGINX: Create a new configuration file:
```
sudo nano /etc/nginx/sites-available/ripon.com
```
Add the following configuration:
```
server {
    listen 80;
    server_name ripon.com www.ripon.com;

    location / {
        proxy_pass http://160.191.163.33:31000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
### Enable the Configuration: Create a symbolic link to enable the site:
```
sudo ln -s /etc/nginx/sites-available/ripon.com /etc/nginx/sites-enabled/
```
### Test the configuration:
```
sudo nginx -t
```
### Reload NGINX:

```
sudo systemctl reload nginx
```
Access the Application: Visit your domain (http://ripon.com) in the browser.

## Step 3: Enable HTTPS with Certbot
To secure your domain with HTTPS, use Let's Encrypt via Certbot.

### Install Certbot:
```
sudo apt install certbot python3-certbot-nginx
```
### Request a Certificate: Run Certbot to obtain and configure SSL for your domain:
```
sudo certbot --nginx -d ripon.com -d www.ripon.com
```
### Test HTTPS Configuration: Certbot will automatically configure NGINX for HTTPS. Verify the
```
sudo nginx -t
sudo systemctl reload nginx
```
### Visit Your Domain: Access your domain with HTTPS:
```
https://ripon.com
```
### Set Up Auto-Renewal: Certbot automatically renews certificates, but you can test it with:
```
sudo certbot renew --dry-run
```





