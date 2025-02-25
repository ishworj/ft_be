import express from "express"
import OpenAI from "openai";

const router = express.Router();
router.post("/", async (req, res,next) => {
 try {
    const question = req.body.question;
    const openai = new OpenAI({
      apiKey: process.env.OPEN_API_key,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful financial assistant" },
        {
          role: "user",
          content: question,
        },
      ],
      store: true,
    });
    return res.json(completion.choices[0].message);
 } catch (error) {
    next({
        status:"500",
        message: "error while creating suggestions"
    })
 }
});


export default router;