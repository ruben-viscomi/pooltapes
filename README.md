<!--# ![pooltapes-color](https://user-images.githubusercontent.com/74663147/162610436-542e9389-fce5-44ed-9f50-f47f6b29a910.svg | width=100) -->
# <img src="https://user-images.githubusercontent.com/74663147/162610436-542e9389-fce5-44ed-9f50-f47f6b29a910.svg" alt="pooltapes-color" width="200"/>
A simple OTT platform built to scale.

Development Process. Current at Step 3 (10% done):
<ul>
  <li><span>&#10003;</span> Step 1: development of backend services for auth, media-metadata, user-generated. This proivides basic functionality.</li>
  <li><span>&#10003;</span> Step 2: implementation of VOD servers with node. Needs some work to support multi audio/resolution renditions.</li>
  <li>Step 3: development of frontend which packages both customer-client and admin-client. Distinction is based upon auth-service</li>
  <li>Step 4: development of personalization-service implementing 1st step of 'Pooltapes Personalization Service Implementation' doc.</li>
  <li>Step 5: blockchain integration through implementation of both admin and billing services. private blockchain using Geth</li>
  <li>Step 6: migration of VOD servers to Nginx.</li>
</ul>

NOTES:
<ul>
  <li>vod-server &#8594; hls-converter: create 'base-converter.ts' and use the Factory Pattern to instantiate the proper converter.</li>
</ul>

