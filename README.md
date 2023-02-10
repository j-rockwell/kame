![](https://user-images.githubusercontent.com/28965487/214147743-e18ffd70-a455-4544-a9d8-c3eca734c61e.png)
<h3 align="center">🍣 Sushi Kame Booking</h3>
<p align="center">Specialty booking software for Omakase Restaurants</p>  
&nbsp; 

<h3>Getting Started</h3>
Clone the repository using <code>git clone git@github.com:j-rockwell/kame.git</code>  

Start all applications using <code>docker-compose up --build</code>  

If successful you will see the frontend running on <code>localhost:3000</code>, backend services on <code>localhost:8080</code> and mongo/redis on their default ports.  
&nbsp;

<h3>Project Contents</h3>  
<h4>.github/workflows</h4>
When changes are pushed to the <code>main</code> branch, we run the following workflows:  
<ul>
  <li>CodeQL Analysis on both the Client and Server</li>
  <li>Standard Go Build on the Server</li>
  <li>Standard <code>npm run build</code> on the Client</li>
  <li>Test Coverage for the Client</li>
</ul>  
These tests insure that we are not pushing a failing build to production servers. In the future, additional integration tests will be performed via Docker images.  
  
<h4>/client</h4>
Next.js application that consumes data from the <code>/server</code>. Styling is powered by <a href="https://chakra-ui.com/">Chakra</a> and <a href="https://www.framer.com/motion/">Framer Motion</a>.  
  
<h4>/server</h4>
Gin-gonic monorepo which powers all backend services. Main backing database is handled by <a href="https://www.mongodb.com/">MongoDB</a> and quick cache r/w uses <a href="https://redis.io/">Redis</a>  
  
<h4>docker-compose.yml</h4>
Composes all docker instances needed to run the application locally. In production these images are all pushed separately.
&nbsp;

<h3>Disclaimer</h3>
This project is not for public/commercial-use outside of Sushi Kame. This application has been sanitized and made public as a portfolio item with the contract holders approval. For business/freelance inqueries you can <a href="mailto:john@llewkcor.com">send me an email</a>.
&nbsp;
  
<h3>Copyright</h3>
Copyright 2023 John Rockwell
Open-source under the MIT License
