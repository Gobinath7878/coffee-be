import Coffee from "../models/Coffee.js";

//post new Coffee

export const createCoffee = async (req, res) => {
  const newCoffee = new Coffee(req.body);

  try {
    const savedCoffee = await newCoffee.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedCoffee,
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: "Failed to create.Try again",
    });
  }
};

// update Coffee
export const updateCoffee = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedCoffee = await Coffee.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedCoffee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

// delete Coffee
export const deleteCoffee = async (req, res) => {
  const id = req.params.id;

  try {
    await Coffee.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// getSingle Coffee
export const getSingleCoffee = async (req, res) => {
  const id = req.params.id;

  try {
    const coffee = await Coffee.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfully found",
      data: coffee,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// getAll Coffee
export const getAllCoffee = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const coffees = await Coffee.find({})
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: coffees.length,
      message: "Successfully found",
      data: coffees,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// get Coffee by search

// export const getCoffeeBySearch = async (req, res) => {
//   const city = new RegExp(req.query.city, "i");
//   const distance = parseInt(req.query.distance);
//   const maxGroupSize = parseInt(req.query.maxGroupSize);

//   try {
//     const coffees = await Coffee.find({
//       city,
//       distance: { $gte: distance },
//       maxGroupSize: { $gte: maxGroupSize },
//   }).populate("reviews");

//     res.status(200).json({
//       success: true,
//       message: "Successfully found",
//       data: tours,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "not found",
//     });
//   }
// };

// // get featured tour

// export const getFeaturedTour = async (req, res) => {
//   try {
//     const tours = await Tour.find({ featured: true })
//     .populate("reviews")
//     .limit(8);

//     res.status(200).json({
//       success: true,
//       message: "Successfully found",
//       data: tours,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "not found",
//     });
//   }
// };

// // get tour counts
// export const getTourCount = async (req, res) => {
//   try {
//     const tourCount = await Tour.estimatedDocumentCount();
//     res.status(200).json({ success: true, data: tourCount });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "failed to fetch" });
//   }
// };
