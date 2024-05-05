export let updateStateButton = (items, selectedUserId, propsName, updateToggle) => {
    return items.map(item => {
        if (item[propsName] !== selectedUserId) return item;
        return { ...item, ...updateToggle }
    });
}