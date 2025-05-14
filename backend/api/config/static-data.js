
module.exports = {
    seeds: {
        tickets: [
            {
                // _id will be auto-generated
                // createdAt will be auto-generated
                customerName: "Customer 1",
                email: "customer1@example.com",
                status: "pending",
                notes: ""
            },
            {
                // _id will be auto-generated
                // createdAt will be auto-generated
                customerName: "Customer 2",
                email: "customer2@example.com",
                status: "done",
                notes: "This is a note for customer 2."
            },
            {
                // _id will be auto-generated
                // createdAt will be auto-generated
                customerName: "Customer 3",
                email: "customer3@example.com",
                status: "open",
                notes: "This is a note for customer 3."
            },
        ],
    },
};
