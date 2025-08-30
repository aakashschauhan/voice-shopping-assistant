# Deployment Guide

## Firebase Hosting (Recommended Free Tier)
1. Install CLI: `npm i -g firebase-tools`
2. `firebase login`
3. Initialize (if not already): `firebase init hosting`
   - Public directory: `dist`
   - Configure as single-page app: `Yes`
   - Overwrite `index.html`: `No`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## Google Cloud Run (Static Hosting via Nginx)
1. Build app: `npm run build`
2. Add a simple Dockerfile (optional sample below) and deploy to Cloud Run.

   ```Dockerfile
   FROM nginx:alpine
   COPY dist /usr/share/nginx/html
   ```

3. `gcloud run deploy --source . --region=asia-south1 --allow-unauthenticated`

## AWS S3 + CloudFront (Static Website)
1. `npm run build`
2. Upload `dist/` to an S3 bucket (enable static website hosting).
3. (Optional) Put CloudFront in front for HTTPS + CDN.
