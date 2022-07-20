//Fetching All Transaction
export const getAllTransactions = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/transactions/${id}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error(err.message);
  }
};
