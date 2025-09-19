export default {
  lang: {
    en: "EN",
    zh: "中文",
  },
  header: {
    title: "🍌 Nano Bananary",
    history: "History",
    historyAriaLabel: "Toggle generation history",
  },
  transformationSelector: {
    title: "Let's Go Bananas!",
    subtitle: "Ready to remix your reality? Pick an effect to start the magic. You can also drag and drop to reorder your favorite effects.",
    subtitleWithResult: "That was fun! Your last creation is ready for another round. Select a new effect to keep the chain going.",
  },
  editor: {
    backButton: "Choose Another Effect",
    customPromptPlaceholder: "e.g., 'make the sky a vibrant sunset' or 'add a small red boat on the water'",
    maskToolButton: "Draw Mask",
    generateButton: "Generate Image",
    generatingButton: "Generating",
    resultTitle: "Result",
    resultPlaceholder: "Your generated image will appear here.",
  },
  result: {
    viewModes: {
      result: "Result",
      grid: "Grid",
      slider: "Slider",
      sidebyside: "Side-by-Side",
    },
    twoStep: {
      original: "Original",
      lineArt: "Line Art",
      final: "Final Result",
      downloadBoth: "Download Both",
      useLineArt: "Use Line Art as Input",
      useFinal: "Use Final as Input",
    },
    downloadComparison: "Download Comparison",
    downloadImage: "Download Image",
    useAsInput: "Use as Input",
    generatedAlt: "Generated result",
    originalAlt: "Original image",
    originalLabel: "Original",
    generatedLabel: "Generated",
  },
  history: {
    title: "Generation History",
    empty: "Your generated images will appear here once you create something.",
    lineArtAlt: "Line Art Result",
    lineArtLabel: "Line Art",
    finalResultAlt: "Final Result",
    finalResultLabel: "Final Result",
    generatedResultAlt: "Generated Result",
    use: "Use",
    save: "Save",
    download: "Download",
    useAsInput: "Use as Input",
  },
  uploader: {
    clickToUpload: "Click to upload",
    orDragAndDrop: "or drag and drop",
    clickOrDrag: "Click or drag to upload",
    removeImageAriaLabel: "Remove image",
    removeImageAriaLabelTemplate: "Remove {{title}} image",
  },
  maskTool: {
    description: "Draw on the image to create a mask for localized edits.",
    brushSize: "Brush Size",
    undo: "Undo",
    clear: "Clear Mask",
  },
  preview: {
    imageAlt: "Generated result preview",
    closeAriaLabel: "Close preview",
    downloadButton: "Download Image",
  },
  loading: {
    default: "Generating your masterpiece...",
    subtext: "This can sometimes take a moment.",
    step1: "Step 1: Creating line art...",
    step2: "Step 2: Applying color palette...",
  },
  errors: {
    title: "An Error Occurred",
    unknown: "An unknown error occurred.",
    missingImageAndEffect: "Please upload an image and select an effect.",
    missingBothImages: "Please upload both required images.",
    missingPrompt: "Please enter a prompt describing the change you want to see.",
    step1Failed: "Step 1 (line art) failed to generate an image.",
    useAsInputFailed: "Could not use the generated image as a new input.",
    missingApiKey: "Please set up your Gemini API Key first.",
  },
  apiKey: {
    title: "API Key Settings",
    notSet: "No API Key set",
    inputLabel: "Gemini API Key",
    placeholder: "Enter your Gemini API Key",
    instructions: "You need a Google AI Studio API Key to use this app. The API Key will be stored securely in your browser locally.",
    getKeyLink: "Get Free API Key",
    save: "Save",
    clear: "Clear",
    saved: "Saved",
    validating: "Saving...",
  },
  transformations: {
    custom: {
      title: "Custom Prompt",
      description: "Describe any change you can imagine. Your creativity is the only limit!",
    },
    figurine: {
      title: "3D Figurine",
      description: "Turns your photo into a collectible 3D character figurine, complete with packaging.",
    },
    funko: {
      title: "Funko Pop Figure",
      description: "Reimagines your subject as an adorable Funko Pop! vinyl figure in its box.",
    },
    lego: {
      title: "LEGO Minifigure",
      description: "Builds a LEGO minifigure version of your subject, ready for play.",
    },
    crochet: {
      title: "Crochet Doll",
      description: "Transforms your image into a soft, handmade crochet doll.",
    },
    cosplay: {
      title: "Anime to Cosplay",
      description: "Brings an anime character to life as a realistic cosplay photo.",
    },
    plushie: {
      title: "Cute Plushie",
      description: "Converts your subject into a cuddly, soft plushie toy.",
    },
    keychain: {
      title: "Acrylic Keychain",
      description: "Creates a cute acrylic keychain of your subject, perfect for hanging on a bag.",
    },
    hdEnhance: {
      title: "HD Enhance",
      description: "Upscales your image, adding sharpness, clarity, and detail for a high-res look.",
    },
    poseReference: {
      title: "Pose Reference",
      description: "Applies a pose from one image to a character from another.",
      primaryTitle: "Character",
      primaryDescription: "The main character",
      secondaryTitle: "Pose Reference",
      secondaryDescription: "The pose to apply",
    },
    photorealistic: {
      title: "To Photorealistic",
      description: "Converts drawings or illustrations into stunningly realistic photos.",
    },
    fashionMagazine: {
      title: "Fashion Magazine",
      description: "Gives your photo a high-fashion, editorial look worthy of a magazine cover.",
    },
    hyperRealistic: {
      title: "Hyper-realistic",
      description: "Applies a gritty, direct-flash photography style for a cool, hyper-realistic vibe.",
    },
    architecture: {
      title: "Architecture Model",
      description: "Transforms a building into a detailed miniature architectural model.",
    },
    productRender: {
      title: "Product Render",
      description: "Turns a product sketch into a professional, photorealistic 3D render.",
    },
    sodaCan: {
      title: "Soda Can Design",
      description: "Wraps your image onto a soda can and places it in a slick product shot.",
    },
    industrialDesign: {
      title: "Industrial Design Render",
      description: "Renders an industrial design sketch as a real product in a museum setting.",
    },
    colorPalette: {
      title: "Color Palette Swap",
      description: "Converts an image to line art, then colors it using a second image as a palette.",
      primaryTitle: "Original Image",
      primaryDescription: "The image to transform",
      secondaryTitle: "Color Palette",
      secondaryDescription: "The color reference",
    },
    lineArt: {
      title: "Line Art Drawing",
      description: "Reduces your photo to its essential lines, creating a clean sketch.",
    },
    paintingProcess: {
      title: "Painting Process",
      description: "Shows a 4-step grid of your image being created, from sketch to final painting.",
    },
    markerSketch: {
      title: "Marker Sketch",
      description: "Reimagines your photo as a vibrant sketch made with Copic markers.",
    },
    addIllustration: {
      title: "Add Illustration",
      description: "Adds charming, hand-drawn characters into your real-world photo.",
    },
    cyberpunk: {
      title: "Cyberpunk",
      description: "Transforms your scene into a neon-drenched, futuristic cyberpunk city.",
    },
    vanGogh: {
      title: "Van Gogh Style",
      description: "Repaints your photo with the iconic, swirling brushstrokes of 'Starry Night'.",
    },
    isolate: {
      title: "Isolate & Enhance",
      description: "Cuts out a masked subject and creates a clean, high-definition portrait.",
    },
    screenEffect: {
      title: "3D Screen Effect",
      description: "Makes content on a screen in your photo appear to pop out in 3D.",
    },
    makeupAnalysis: {
      title: "Makeup Analysis",
      description: "Analyzes makeup in a portrait and suggests improvements with red-pen markup.",
    },
    changeBackground: {
      title: "Change Background",
      description: "Swaps the existing background for a cool, retro Y2K aesthetic.",
    },
  },
};
