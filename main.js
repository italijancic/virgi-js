
  const cart = [];

  // Fetch data from file
  fetch('./data.json')
    .then(res => res.json())
    .then(data => renderProducts(data))

  // Render fetched data
  function renderProducts(products) {
    const productList = document.getElementById('product-list');
    // console.log(products);
    products.forEach(function(product) {
      const card = createCard(product);
      productList.appendChild(card);
    });
  }


  function createCard(product) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mt-2')

    const image = document.createElement('img');
    image.src = product.image;
    image.classList.add('card-img-top');
    card.appendChild(image);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const title = document.createElement('h5');
    title.textContent = product.name;
    title.classList.add('card-title');
    cardBody.appendChild(title);

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;
    price.classList.add('card-text');
    cardBody.appendChild(price);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Agregar al carrito';
    addToCartBtn.classList.add('btn', 'btn-primary');
    addToCartBtn.addEventListener('click', function() {
      addToCart(product);
    });
    cardBody.appendChild(addToCartBtn);

    return card;
  }


  function addToCart(product) {
    cart.push(product);
    saveCart();
    displayCart();
  }


  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }


  function loadCart() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      cart.push(...JSON.parse(cartData));
      displayCart();
    }
  }


  function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(function(product) {
      const li = document.createElement('li');
      li.textContent = product.name;
      cartItems.appendChild(li);
    });


    const totalPrice = document.getElementById('total-price')
    totalPrice.innerHTML = '';
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    if (total != 0) {
      totalPrice.innerHTML = `Total: U$S ${total}`;
    }
  }


  function calculateTotal() {
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    document.getElementById('total-price').textContent = `$${total}`;
  }


  function checkout() {
    cart.length = 0;
    saveCart();
    displayCart();
    calculateTotal();
  }


  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', checkout);


  loadCart();
