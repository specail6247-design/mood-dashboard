import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeMood(imageFile, locationInfo, apiKey) {
  if (!apiKey) throw new Error("API Key 이가 누락되었습니다.");

  const cleanApiKey = apiKey.trim();
  const genAI = new GoogleGenerativeAI(cleanApiKey);
  
  // Confirmed working model: gemini-flash-latest
  // This avoids 404 errors (associated with 1.5-flash) and 429 errors (associated with 2.0 experimental)
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  try {
    const imageBase64 = await fileToGenerativePart(imageFile);
    
    const prompt = `
      이 이미지의 분위기를 분석하고 다음을 한국어로 제공해줘:
      1. 분위기에 어울리는 짧고 영감을 주는 '오늘의 한 줄 문구' (최대 20자).
      2. 분위기에 어울리는 감성적인 3-4줄의 짧은 시.
      3. 분위기를 대표하는 HEX 색상 코드.
      4. 분위기에 대한 짧은 설명 (예: "따뜻함", "고독함").
      
      사용자 위치/날씨 정보: ${locationInfo || "정보 없음"}

      반드시 아래 JSON 형식으로만 응답해:
      {
        "quote": "문구",
        "poem": "시 내용",
        "moodColor": "#hex",
        "moodDescription": "설명"
      }
      마크다운 기호 없이 순수 JSON만 보내줘.
    `;

    const result = await model.generateContent([prompt, imageBase64]);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI Analysis Failed:", error);
    throw error;
  }
}

async function fileToGenerativePart(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
