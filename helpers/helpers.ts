function calculateShippingCost(amount: number): number {
    let discount = 0;
    let shipping = amount * 50;
    if (amount < 3) return shipping
    if (amount >= 3 && amount < 8) {
        for (let i = 3; i <= amount; i++) {
            discount += 0.05;
        }
        return shipping * (1 - discount)
    }
    return shipping * 0.7
}

function calculateFinalShipping(shipping: number, productShipping: number, differentItems: number): number {
    if (differentItems >= 3) {
        return (shipping + productShipping) * 0.9;
    }
    return shipping + productShipping;
}

export {
    calculateShippingCost,
    calculateFinalShipping
}
