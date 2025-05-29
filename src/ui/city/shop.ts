class Shop {
    items: { name: string, price: number }[];

    constructor(items: { name: string, price: number }[]) {
        this.items = items;
    }

    buyItem(player: Player, itemName: string): void {
        const item = this.items.find(item => item.name === itemName);

        if (!item) {
            console.log('Item not found in the shop');
            return;
        }

        if (player.money < item.price) {
            console.log('Not enough money to buy this item');
            return;
        }

        player.money -= item.price;
        console.log(`Player bought ${item.name} for ${item.price} coins`);
    }
}

class Player {
    money: number;

    constructor(money: number) {
        this.money = money;
    }
}

// Usage
const player = new Player(100);
const shopItems = [
    { name: 'Sword', price: 50 },
    { name: 'Potion', price: 20 },
    { name: 'Shield', price: 30 }
];
const shop = new Shop(shopItems);

shop.buyItem(player, 'Sword');
shop.buyItem(player, 'Potion');
shop.buyItem(player, 'Shield');