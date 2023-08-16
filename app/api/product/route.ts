import { client } from '@/sanity/lib/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const { title, description } = req.body; 
    const mutation = {
      _type: 'product',
      title: title,
      description: description
    };

    const insertedData = await client.create(mutation); 
    res.status(200).json({ message: 'Data inserted successfully!', data: insertedData });
  } else if (req.method === 'PUT') {
    // Update data
    const { id, title, description } = req.body; // Extract the ID and updated data from the request body

    const mutation = client
      .patch(id)
      .set({ title: title, description: description }); // Use the patch method with the ID and set the updated fields

    const updatedData = await mutation.commit(); // Commit the mutation

    res.status(200).json({ message: 'Data updated successfully!', data: updatedData });
  } else if (req.method === 'DELETE') {
    const { id } = req.body; 
    await client.delete(id); 
    res.status(200).json({ message: 'Data deleted successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid request method!' });
  }
}
