

import type { Transformation } from './types';

interface TransformationData {
  id: string;
  prompt: string;
  emoji: string;
  descriptionKey: string;
  titleKey: string;
  isMultiImage?: boolean;
  isTwoStep?: boolean;
  stepTwoPrompt?: string;
  primaryUploaderTitleKey?: string;
  secondaryUploaderTitleKey?: string;
  primaryUploaderDescriptionKey?: string;
  secondaryUploaderDescriptionKey?: string;
}

export const TRANSFORMATION_DATA: TransformationData[] = [
  // Viral & Fun Transformations
  { 
    id: "custom",
    titleKey: "transformations.custom.title", 
    prompt: "CUSTOM", 
    emoji: "✍️",
    descriptionKey: "transformations.custom.description"
  },
  { 
    id: "figurine",
    titleKey: "transformations.figurine.title", 
    prompt: "turn this photo into a character figure. Behind it, place a box with the character’s image printed on it, and a computer showing the Blender modeling process on its screen. In front of the box, add a round plastic base with the character figure standing on it. set the scene indoors if possible", 
    emoji: "🧍",
    descriptionKey: "transformations.figurine.description"
  },
  { 
    id: "funko",
    titleKey: "transformations.funko.title", 
    prompt: "Transform the person into a Funko Pop figure, shown inside and next to its packaging.", 
    emoji: "📦",
    descriptionKey: "transformations.funko.description"
  },
  { 
    id: "lego",
    titleKey: "transformations.lego.title", 
    prompt: "Transform the person into a LEGO minifigure, inside its packaging box.", 
    emoji: "🧱",
    descriptionKey: "transformations.lego.description"
  },
  { 
    id: "crochet",
    titleKey: "transformations.crochet.title", 
    prompt: "Transform the subject into a handmade crocheted yarn doll with a cute, chibi-style appearance.", 
    emoji: "🧶",
    descriptionKey: "transformations.crochet.description"
  },
  { 
    id: "cosplay",
    titleKey: "transformations.cosplay.title", 
    prompt: "Generate a highly detailed, realistic photo of a person cosplaying the character in this illustration. Replicate the pose, expression, and framing.", 
    emoji: "🎭",
    descriptionKey: "transformations.cosplay.description"
  },
  { 
    id: "plushie",
    titleKey: "transformations.plushie.title", 
    prompt: "Turn the person in this photo into a cute, soft plushie doll.", 
    emoji: "🧸",
    descriptionKey: "transformations.plushie.description"
  },
  { 
    id: "keychain",
    titleKey: "transformations.keychain.title", 
    prompt: "Turn the subject into a cute acrylic keychain, shown attached to a bag.", 
    emoji: "🔑",
    descriptionKey: "transformations.keychain.description"
  },
  
  // Photorealistic & Enhancement
  { 
    id: "hdEnhance",
    titleKey: "transformations.hdEnhance.title", 
    prompt: "Enhance this image to high resolution, improving sharpness and clarity.", 
    emoji: "🔍",
    descriptionKey: "transformations.hdEnhance.description"
  },
  { 
    id: "poseReference",
    titleKey: "transformations.poseReference.title", 
    prompt: "Apply the pose from the second image to the character in the first image. Render as a professional studio photograph.",
    emoji: "💃",
    descriptionKey: "transformations.poseReference.description",
    isMultiImage: true,
    primaryUploaderTitleKey: "transformations.poseReference.primaryTitle",
    primaryUploaderDescriptionKey: "transformations.poseReference.primaryDescription",
    secondaryUploaderTitleKey: "transformations.poseReference.secondaryTitle",
    secondaryUploaderDescriptionKey: "transformations.poseReference.secondaryDescription",
  },
  { 
    id: "photorealistic",
    titleKey: "transformations.photorealistic.title", 
    prompt: "Turn this illustration into a photorealistic version.", 
    emoji: "🪄",
    descriptionKey: "transformations.photorealistic.description"
  },
  { 
    id: "fashionMagazine",
    titleKey: "transformations.fashionMagazine.title", 
    prompt: "Transform the photo into a stylized, ultra-realistic fashion magazine portrait with cinematic lighting.", 
    emoji: "📸",
    descriptionKey: "transformations.fashionMagazine.description"
  },
  { 
    id: "hyperRealistic",
    titleKey: "transformations.hyperRealistic.title", 
    prompt: "Generate a hyper-realistic, fashion-style photo with strong, direct flash lighting, grainy texture, and a cool, confident pose.", 
    emoji: "✨",
    descriptionKey: "transformations.hyperRealistic.description"
  },

  // Design & Product
  { 
    id: "architecture",
    titleKey: "transformations.architecture.title", 
    prompt: "Convert this photo of a building into a miniature architecture model, placed on a cardstock in an indoor setting. Show a computer with modeling software in the background.", 
    emoji: "🏗️",
    descriptionKey: "transformations.architecture.description"
  },
  { 
    id: "productRender",
    titleKey: "transformations.productRender.title", 
    prompt: "Turn this product sketch into a photorealistic 3D render with studio lighting.", 
    emoji: "💡",
    descriptionKey: "transformations.productRender.description"
  },
  { 
    id: "sodaCan",
    titleKey: "transformations.sodaCan.title", 
    prompt: "Design a soda can using this image as the main graphic, and show it in a professional product shot.", 
    emoji: "🥤",
    descriptionKey: "transformations.sodaCan.description"
  },
  { 
    id: "industrialDesign",
    titleKey: "transformations.industrialDesign.title", 
    prompt: "Turn this industrial design sketch into a realistic product photo, rendered with light brown leather and displayed in a minimalist museum setting.", 
    emoji: "🛋️",
    descriptionKey: "transformations.industrialDesign.description"
  },

  // Artistic & Stylistic
  { 
    id: "colorPalette",
    titleKey: "transformations.colorPalette.title",
    prompt: "Turn this image into a clean, hand-drawn line art sketch.", // Step 1 prompt
    stepTwoPrompt: "Color the line art using the colors from the second image.", // Step 2 prompt
    emoji: "🎨",
    descriptionKey: "transformations.colorPalette.description",
    isMultiImage: true,
    isTwoStep: true,
    primaryUploaderTitleKey: "transformations.colorPalette.primaryTitle",
    primaryUploaderDescriptionKey: "transformations.colorPalette.primaryDescription",
    secondaryUploaderTitleKey: "transformations.colorPalette.secondaryTitle",
    secondaryUploaderDescriptionKey: "transformations.colorPalette.secondaryDescription",
  },
  { 
    id: "lineArt",
    titleKey: "transformations.lineArt.title", 
    prompt: "Turn the image into a clean, hand-drawn line art sketch.", 
    emoji: "✍🏻",
    descriptionKey: "transformations.lineArt.description"
  },
  { 
    id: "paintingProcess",
    titleKey: "transformations.paintingProcess.title", 
    prompt: "Generate a 4-panel grid showing the artistic process of creating this image, from sketch to final render.", 
    emoji: "🖼️",
    descriptionKey: "transformations.paintingProcess.description"
  },
  { 
    id: "markerSketch",
    titleKey: "transformations.markerSketch.title", 
    prompt: "Redraw the image in the style of a Copic marker sketch, often used in design.", 
    emoji: "🖊️",
    descriptionKey: "transformations.markerSketch.description"
  },
  { 
    id: "addIllustration",
    titleKey: "transformations.addIllustration.title", 
    prompt: "Add a cute, cartoon-style illustrated couple into the real-world scene, sitting and talking.", 
    emoji: "🧑‍🎨",
    descriptionKey: "transformations.addIllustration.description"
  },
  { 
    id: "cyberpunk",
    titleKey: "transformations.cyberpunk.title", 
    prompt: "Transform the scene into a futuristic cyberpunk city.", 
    emoji: "🤖",
    descriptionKey: "transformations.cyberpunk.description"
  },
  { 
    id: "vanGogh",
    titleKey: "transformations.vanGogh.title", 
    prompt: "Reimagine the photo in the style of Van Gogh's 'Starry Night'.", 
    emoji: "🌌",
    descriptionKey: "transformations.vanGogh.description"
  },

  // Utility & Specific Edits
  { 
    id: "isolate",
    titleKey: "transformations.isolate.title", 
    prompt: "Isolate the person in the masked area and generate a high-definition photo of them against a neutral background.", 
    emoji: "🎯",
    descriptionKey: "transformations.isolate.description"
  },
  { 
    id: "screenEffect",
    titleKey: "transformations.screenEffect.title", 
    prompt: "For an image with a screen, add content that appears to be glasses-free 3D, popping out of the screen.", 
    emoji: "📺",
    descriptionKey: "transformations.screenEffect.description"
  },
  { 
    id: "makeupAnalysis",
    titleKey: "transformations.makeupAnalysis.title", 
    prompt: "Analyze the makeup in this photo and suggest improvements by drawing with a red pen.", 
    emoji: "💄",
    descriptionKey: "transformations.makeupAnalysis.description"
  },
  { 
    id: "changeBackground",
    titleKey: "transformations.changeBackground.title", 
    prompt: "Change the background to a Y2K aesthetic style.", 
    emoji: "🪩",
    descriptionKey: "transformations.changeBackground.description"
  },
];


export const getTransformations = (t: (key: string) => string): Transformation[] => {
  return TRANSFORMATION_DATA.map(data => ({
    id: data.id,
    prompt: data.prompt,
    emoji: data.emoji,
    title: t(data.titleKey),
    description: t(data.descriptionKey),
    isMultiImage: data.isMultiImage,
    isTwoStep: data.isTwoStep,
    stepTwoPrompt: data.stepTwoPrompt,
    primaryUploaderTitle: data.primaryUploaderTitleKey ? t(data.primaryUploaderTitleKey) : undefined,
    primaryUploaderDescription: data.primaryUploaderDescriptionKey ? t(data.primaryUploaderDescriptionKey) : undefined,
    secondaryUploaderTitle: data.secondaryUploaderTitleKey ? t(data.secondaryUploaderTitleKey) : undefined,
    secondaryUploaderDescription: data.secondaryUploaderDescriptionKey ? t(data.secondaryUploaderDescriptionKey) : undefined,
  }));
};
