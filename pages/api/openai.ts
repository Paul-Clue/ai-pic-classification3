import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
// import * as dotenv from 'dotenv';
// dotenv.config();
console.log('It is working');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('response');
  if (req.method === 'POST') {
    try {
      const { image } = req.body;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'You are warehouse robot. Detect the main object in the image. Give a description of the object. If it is a consumer good classify what type of consumer good then output [Consumer Good]. If it is not a consumer good, describe what it is then output [Not a Consumer Good].',
              },
              {
                type: 'image_url',
                image_url: {
                  // url: `data:image/jpeg;base64,${image}`,
                  url: image,
                },
              },
            ],
          },
        ],
        // model: "gpt-4-vision-preview",
        // messages: [
        //   {
        //     role: "user",
        //     content: [
        //       { type: "text", text: "Describe this image." },
        //       { type: "image_url", image_url: { url: image } },
        //     ],
        //   },
        // ],
      });
      // console.log('response', response);
      res
        .status(200)
        .json({ description: response.choices[0].message.content });
    } catch (error) {
      console.error('Error processing image:', error);
      // res.status(500).json({ error: 'Failed to process image' });
      res.status(500).json({ error: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

//   const { image } = req.body;
//   if (!image) {
//     return res.status(400).json({ error: 'Image is required' });
//   }
//   const imageDescription = await openai.chat.completions.create({
//     model: 'gpt-4o',
//     messages: [
//       {
//         role: 'user',
//         content: [
//           {
//             type: 'text',
//             text: 'Describe this image.',
//           },
//           {
//             type: 'image_url',
//             image_url: {
//               url: `data:image/jpeg;base64,${image}`,
//             },
//           },
//         ],
//       },
//     ],
//   });
//   res.status(200).json({ description: imageDescription.choices[0].message.content });
// }

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// import fs from 'fs';

// const base64Image = fs.readFileSync('public/images/can.jpeg', {
//   encoding: 'base64',
// });

// const response = await openai.chat.completions.create({
//   model: 'gpt-4o',
//   messages: [
//     {
//       role: 'user',
//       content: [
//         {
//           type: 'text',
//           text: 'Describe this image.',
//         },
//         {
//           type: 'image_url',
//           image_url: {
//             url: `data:image/jpeg;base64,${base64Image}`,
//           },
//         },
//       ],
//     },
//   ],
// });
// export const ai = (imageConversion: string) => {
//   return openai.chat.completions.create({
//     model: 'gpt-4-vision-preview',
//     messages: [
//       {
//         role: 'user',
//         content: [
//           {
//             type: 'text',
//             text: 'Describe this image.',
//           },
//           {
//             type: 'image_url',
//             image_url: {
//               url: `data:image/jpeg;base64,${imageConversion}`,
//             },
//           },
//         ],
//       },
//     ],
//   });
// };

// console.log(response.choices[0].message.content);
