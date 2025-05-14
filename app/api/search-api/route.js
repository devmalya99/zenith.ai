

// import { NextResponse } from "next/server";
// //This is to make the request to the google search api
// import axios from "axios";


// export async function POST(req) {
//     try {
        
//         //step1: Validate environment variables using zod
//         if(
//             !process.env.GOOGLE_SEARCH_API_URL || 
//             !process.env.GOOGLE_SEARCH_API_KEY ||
//             !process.env.GOOGLE_SEARCH_ENGINE_ID
//         ){
//            throw new Error("Missing required API variables")
//         }

//         //step 2 parse request body
//         const body = await req.json();
//         const {userInput, searchType}=body;

//         //Basic input validation 
//         if(
//             !userInput || 
//             typeof userInput !== "string" || 
//             !searchType ||
//             typeof searchType !== "string" ||
//             userInput.trim()===''
//         ){
//             return NextResponse.json(
//                 {
//                     success:false,
//                     error:"Missing required parameters"
//                 },
//                 {status:400}
//             )
//         }

//         //step:3: construct API parameters
//         const params = {
//             key: process.env.GOOGLE_SEARCH_API_KEY,
//             cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
//             q: userInput,
//             ...(searchType && {searchType}),
//             num:10, //Number of results to return
//             safe:'active'
//         };

//         //step 4 : Make api request with timeout
//         const response = await axios.get(process.env.GOOGLE_SEARCH_API_URL,{
//             params,
//             timeout:5000 //5 second timeout
//         });

//         // Transform response data
//     // const results = response.data.items?.map(item => ({
//     //   title: item.title,
//     //   link: item.link,
//     //   snippet: item.snippet,
//     //   ...(item.pagemap?.cse_image?.[0]?.src && { image: item.pagemap.cse_image[0].src })
//     // })) || [];
          
//     return NextResponse.json(
//         {
//             success:true,
//             query: userInput,
//             results:response.data
//         },
//         {status:200}
//     )
    
   

// }
 

//      catch (error) {
//        console.error('Search API Error:', error);

//     // Handle Axios errors
//     if (axios.isAxiosError(error)) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: "API request failed",
//           status: error.response?.status,
//           message: error.message 
//         },
//         { status: error.response?.status || 500 }
//       );
//     }

//     // Handle other errors
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: error.message || "Internal server error" 
//       },
//       { status: 500 }
//     );
//   }
// }
    
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: "Basic POST works!" });
}