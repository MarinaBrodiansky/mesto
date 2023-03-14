export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._initialItems.forEach((item) => {
            this._renderer(item.name, item.link);
        })
    }

    addItem(item) {
        this._container.prepend(item)
    }
}