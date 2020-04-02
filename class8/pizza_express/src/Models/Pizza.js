import fs from 'fs';
import path from 'path';

const db = path.join('data', 'pizzas.json');

class Pizza {
  constructor(name, price) {
    const rawPizzas = fs.readFileSync(db, { encoding: 'utf-8' });

    const empty = rawPizzas == '' || rawPizzas == '[]';

    const pizzas = empty ? [] : JSON.parse(rawPizzas);

    this.name = name;
    this.price = price;
    this.id = empty ? 1 : pizzas[pizzas.length - 1].id + 1;

    pizzas.push({ id: this.id, name: this.name, price: this.price });

    fs.writeFileSync(db, JSON.stringify(pizzas));

    return pizzas;
  }

  destroy() {
    return deletePizza(this.id);
  }

  static all() {
    const rawPizzas = fs.readFileSync(db, { encoding: 'utf-8' });

    const empty = rawPizzas == '' || rawPizzas == '[]';
    if (empty) return undefined;

    const pizzas = JSON.parse(rawPizzas);

    return pizzas;
  }

  static destroy(id) {
    return deletePizza(id);
  }

  deletePizza(id) {
    const rawPizzas = fs.readFileSync(db, { encoding: 'utf-8' });

    const empty = rawPizzas == '' || rawPizzas == '[]';
    if (empty) return undefined;

    const pizzas = JSON.parse(rawPizzas);

    const newPizzas = pizzas.filter((pizza) => pizza.id != id);

    fs.writeFileSync(db, JSON.stringify(newPizzas));

    return newPizzas;
  }
}

export default Pizza;
