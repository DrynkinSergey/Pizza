export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
}
export const getTotalPriceFromLS = () => {
    const priceTotal = localStorage.getItem('totalPrice')
    return priceTotal ? JSON.parse(priceTotal) : 0;
}