const body = document.querySelector('body');
const bodyContent = body.innerHTML;
const nav = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/extract">Extract Watermark</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/train">Train Model</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/how-it-works.pdf" target="_blank">How it works</a>
          </li>
        </ul>
      </div>
    </div>
</nav>
<style>
.container-fluid * {
  margin: 0 auto;
  text-align: center;
}

nav .navbar-toggler {
  margin-left: 10px;
}

.navbar-nav .nav-link {
  margin: 0 30px !important;
}
</style>
`;
body.innerHTML = nav + bodyContent;