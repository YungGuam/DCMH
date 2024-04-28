


// Define a function to add an item to the database
async function addItem(category, itemCount, image) {
    try {
        // Create a new document in the "items" collection
        const docRef = await db.collection('items').add({
            category: category,
            itemCount: itemCount,
            image: image
        });

        console.log('Item added with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding item:', error);
    }
}

// Define a function to delete an item from the database
async function deleteItem(itemId) {
    try {
        // Delete the document with the specified ID from the "items" collection
        await db.collection('items').doc(itemId).delete();
        console.log('Item deleted successfully');
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

// Define a function to modify an item in the database
async function modifyItem(itemId, updatedData) {
    try {
        // Update the document with the specified ID in the "items" collection
        await db.collection('items').doc(itemId).update(updatedData);
        console.log('Item modified successfully');
    } catch (error) {
        console.error('Error modifying item:', error);
    }
}
// Usage example
//addItem('dairy', 10, 'https://example.com/image.jpg');