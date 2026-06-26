import { UpdatePost } from "../types";

export type LegacyUpdatePost = UpdatePost & {
  legacyPath: string;
  modified: string;
  tags: string[];
};

export interface LegacyPageRecord {
  id: string;
  title: string;
  date: string;
  modified: string;
  summary: string;
  content: string;
  legacyPath: string;
  tags: string[];
}

export const LEGACY_UPDATE_POSTS: LegacyUpdatePost[] = [
  {
    "id": "archive-sdk-release-v0-7-0",
    "title": "sdk release v0.7.0",
    "date": "2025-03-31",
    "category": "Release Notes",
    "summary": "The Swarmauri SDK v0.7.0 is here! 🤔 ✔ Introduction of observability components (global and module-level logging) ! ✔ Blazing fast Implementation of UV! ✔ JupyterToolkit alpha (10+ ai tools to automate jupyter notebook workflows) pip install swarmauri==0.7....",
    "content": "The Swarmauri SDK v0.7.0 is here! 🤔\n\n✔ Introduction of observability components (global and module-level logging) !\n\n✔ Blazing fast Implementation of UV!\n\n✔  JupyterToolkit alpha (10+ ai tools to automate jupyter notebook workflows)\n\npip install swarmauri==0.7.0\n\nhttps://github.com/swarmauri/swarmauri-sdk/tree/v0.7.0",
    "legacyPath": "/2025/03/31/sdk-release-v0-7-0/",
    "modified": "2025-05-01",
    "tags": [
      "artificial intelligence",
      "engineering",
      "LLMs",
      "programming",
      "python",
      "releases",
      "sdk",
      "software"
    ]
  },
  {
    "id": "archive-sdk-release-v0-6-1",
    "title": "sdk release v0.6.1",
    "date": "2025-03-04",
    "category": "Release Notes",
    "summary": "What’s new? Give it a try: pip install swarmauri==0.6.1",
    "content": "What’s new?\n\n- Introduction of our plugin architecture\n\n- Release of 40+ standalone plugin packages\n\n- YAML Validation\n\nGive it a try:\n\npip install swarmauri==0.6.1",
    "legacyPath": "/2025/03/04/sdk-release-v0-6-1/",
    "modified": "2025-05-01",
    "tags": [
      "artificial intelligence",
      "databases",
      "engineering",
      "LLMs",
      "python",
      "releases",
      "rest apis",
      "sdk"
    ]
  },
  {
    "id": "archive-crouton-v0-0-4-dev",
    "title": "crouton pre-release v0.0.4",
    "date": "2024-12-07",
    "category": "Release Notes",
    "summary": "Try the Latest Development Release of Crouton! We’ve just released the latest development version of Crouton, our python-powered CRUD route generator. It’s packed with improvements, and we’d love for you to give it a try and share your feedback! 🙌 Why Crou...",
    "content": "Try the Latest Development Release of Crouton!\n\nWe’ve just released the latest development version of Crouton, our python-powered CRUD route generator. It’s packed with improvements, and we’d love for you to give it a try and share your feedback! 🙌\n\nWhy Crouton?\n\nCrouton makes API development easier by:\n\n- Automating CRUD route generation for FastAPI.\n\n- Offering quick customization options.\n\n- Freeing up your time to focus on the core logic of your application.\n\n---\n\nHow to Install the Development Release\n\nInstalling Crouton is simple! Run the following command to get the latest development version:\n\npip install -U crouton --pre\n\n💡 Note: The --pre flag ensures you’re downloading the pre-release version.\n\n---\n\nGet Started\n\nOnce installed, check out our GitHub repository for:\n\n- Full documentation 📚\n\n- Examples to kickstart your project 🚀\n\n- Contribution guidelines 👩‍💻👨‍💻\n\n📦 You can also find Crouton on PyPI for easy package management.",
    "legacyPath": "/2024/12/07/crouton-v0-0-4-dev/",
    "modified": "2024-12-07",
    "tags": [
      "adapters",
      "backend routers",
      "CRUD",
      "databases",
      "engineering",
      "programming",
      "python",
      "releases",
      "rest apis",
      "software"
    ]
  },
  {
    "id": "archive-sdk-release-v0-5-2",
    "title": "sdk release v0.5.2",
    "date": "2024-11-21",
    "category": "Release Notes",
    "summary": "Swarmauri v0.5.2 is here! And guess what? The installation process is now way faster and super seamless. This update tackles some of the issues a few of you ran into earlier, so give it a shot and let us know how it goes. This update is all about speed 🏎️...",
    "content": "Swarmauri v0.5.2 is here!\n\nAnd guess what? The installation process is now way faster and super seamless. This update tackles some of the issues a few of you ran into earlier, so give it a shot and let us know how it goes.\n\nThis update is all about speed 🏎️\n\nand reliability, with extra robustness and multimodal features to make your builds feel effortless. Whether you’re just starting out or deep into a project, this version is designed to be your smoothest ride yet.\n\nPro Tip: Update now and experience the difference!\n\nReady to dive in? Just run:\n\npip install swarmauri\n\nCheck out v0.5.2 on PyPI\n\n---\n\nAs always, we’re here to help if you hit any bumps along the way—just ping us!\n\nHappy building, and don’t forget to let us know what you think!",
    "legacyPath": "/2024/11/21/sdk-release-v0-5-2/",
    "modified": "2024-11-21",
    "tags": [
      "ai",
      "artificial intelligence",
      "coding",
      "engineering",
      "frameowkr",
      "innovation",
      "machine learning",
      "multimodal",
      "programming",
      "python",
      "RAG"
    ]
  },
  {
    "id": "archive-swarmauri-sdk-release-0_5_0",
    "title": "sdk release v0.5.0",
    "date": "2024-10-02",
    "category": "Release Notes",
    "summary": "This release introduces significant changes to the Swarmauri codebase, improving toolkit imports and LLM tool accessibility. Changes and Enhancements: Upgrade Instructions: Install the updated SDK using pip: Add the new environment to Jupyter kernels: Impor...",
    "content": "This release introduces significant changes to the Swarmauri codebase, improving toolkit imports and LLM tool accessibility.\n\nChanges and Enhancements:\n\n- Renamed swarmauri.standard to swarmauri for toolkit imports\n\n- Renamed swarmauri.community to swarmauri_community for LLM tool imports.\n\nUpgrade Instructions:\n\nInstall the updated SDK using pip:\n\npip install swarmauri==0.5.0 swarmauri_community==0.5.0 jupyter ipykernel\n\nAdd the new environment to Jupyter kernels:\n\npython -m ipykernel install --user --name=swarmauri-0.5.0 --display-name \"swarmauri(0.5.0)\"\n\nImportant Notes:\n\n- Update your imports to reflect the new naming conventions.\n\n- Replace swarmauri.standard with swarmauri for toolkit imports.\n\n- Replace swarmauri.community with swarmauri_community for LLM tool imports.\n\nDocumentation:\n\nRefer to the Swarmauri’s official documentation for updated examples and guidelines.",
    "legacyPath": "/2024/10/02/swarmauri-sdk-release-0_5_0/",
    "modified": "2024-10-02",
    "tags": [
      "0.5.0",
      "AI tools",
      "artificial intelligence",
      "engineering",
      "LLMs",
      "releases",
      "sdk",
      "software",
      "swarmauri sdk"
    ]
  },
  {
    "id": "archive-release-v0-4-1-sdk",
    "title": "sdk release v0.4.1",
    "date": "2024-09-01",
    "category": "Release Notes",
    "summary": "A Supercharged Swarmauri Engineer",
    "content": "The wait is over! Swarmauri, a forthcoming open-source LLM orchestration designed to empower developers, innovators, and businesses to build and deploy AI applications efficiently, has just released its latest version, v0.4.1. This beta release is packed with exciting new features, improvements, and bug fixes, setting a new standard for efficiency and innovation.\n\nWhat’s new?\n\nThe v0.4.1 release is a testament to the dedication and expertise of the Swarmauri team, led by @cobycloud.\n\nThis update introduces several significant enhancements, including:\n\n🆕 7 New Distance Calculation Formulas: Extend your capability with the inclusion of 7 advanced distance calculation methods.\n\n🆕AI Studio Model: Introducing the new AI Studio Model, a powerful tool designed to streamline your AI development process.\n\n🆕 Deep Seek Model: Meet the new Deep Seek Model, designed to push the boundaries of AI search and discovery.\n\n🆕 ShuttleAI Model: Get a sneak peek at our upcoming experimental ShuttleAI Model, now with improved tests and parameterization.\n\n🆕Markdown to HTML Parser: Convert markdown to HTML effortlessly with our new parser.\n\n🛠️Issue Templates: Streamlined issue templates for better organization and communication amongst open-source contributors.\n\nContributors\n\nThis release wouldn’t have been possible without the valuable contributions of new team members:\n\n@faizan2700\n\n@John Kagunda\n\n@Techie-John\n\n@abdulsamodazeez\n\nUpgrade\n\nGet Ready to Upgrade! Swarmauri v0.4.1 is now available for install!",
    "legacyPath": "/2024/09/01/release-v0-4-1-sdk/",
    "modified": "2024-09-10",
    "tags": [
      "ai studio",
      "deep seek",
      "distance",
      "html",
      "issue templates",
      "markdown",
      "parser",
      "shuttleai",
      "swarmauri"
    ]
  },
  {
    "id": "archive-serialization-and-swarmauri",
    "title": "serialization and swarmauri",
    "date": "2024-07-08",
    "category": "Tutorials",
    "summary": "In contemporary AI applications, especially those involving Large Language Models (LLMs), efficient data handling and model management are paramount. The Swarmauri SDK provides robust support for various LLM integrations using Pydantic, which powers seamles...",
    "content": "In contemporary AI applications, especially those involving Large Language Models (LLMs), efficient data handling and model management are paramount. The Swarmauri SDK provides robust support for various LLM integrations using Pydantic, which powers seamless serialization and deserialization of models and configurations.\n\nWe will walk you through using Pydantic deserialization and reserialization with three different LLM types within Swarmauri: GroqModel, OpenAIModel, and PerplexityModel.\n\nPrerequisites\n\nBefore diving into the examples, ensure you have the Swarmauri SDK installed in your Python environment. Please note, the SDK is still in beta.\n\npip install swarmauri[full]==0.4.1\n\nGroqModel with SimpleConversationAgent\n\nLet’s begin with how you might use the GroqModel and verify the model’s integrity through serialization and deserialization using Pydantic.\n\nimport os\nfrom swarmauri.standard.llms.concrete.GroqModel import GroqModel\nfrom swarmauri.standard.agents.concrete.SimpleConversationAgent import SimpleConversationAgent\n\n# Initialize the GroqModel\nAPI_KEY = os.getenv('GROQ_API_KEY')\nllm = GroqModel(api_key=API_KEY)\n\n# Create a SimpleConversationAgent with the GroqModel\nagent = SimpleConversationAgent(llm=llm)\n\n# Execute a query\nresult = agent.exec(input_str='hello')\nprint(result)\n\n# Validate the model using Pydantic serialization and deserialization\nassert agent.id == SimpleConversationAgent.model_validate_json(agent.model_dump_json()).id\n\nOpenAIModel with SimpleConversationAgent\n\nNow, let’s see a similar example using OpenAIModel.\n\nimport os\nfrom swarmauri.standard.llms.concrete.OpenAIModel import OpenAIModel\nfrom swarmauri.standard.agents.concrete.SimpleConversationAgent import SimpleConversationAgent\n\n# Initialize the OpenAIModel\nAPI_KEY = os.getenv('OPENAI_API_KEY')\nllm = OpenAIModel(api_key=API_KEY)\n\n# Create a SimpleConversationAgent with the OpenAIModel\nagent = SimpleConversationAgent(llm=llm)\n\n# Execute a query\nresult = agent.exec(input_str='hello')\nprint(result)\n\n# Validate the model using Pydantic serialization and deserialization\nassert agent.id == SimpleConversationAgent.model_validate_json(agent.model_dump_json()).id\n\nPerplexityModel with SimpleConversationAgent\n\nFinally, let’s leverage the PerplexityModel.\n\nimport os\nfrom swarmauri.standard.llms.concrete.PerplexityModel import PerplexityModel\nfrom swarmauri.standard.agents.concrete.SimpleConversationAgent import SimpleConversationAgent\n\n# Initialize the PerplexityModel\nAPI_KEY = os.getenv('PERPLEXITY_API_KEY')\nllm = PerplexityModel(api_key=API_KEY)\n\n# Create a SimpleConversationAgent with the PerplexityModel\nagent = SimpleConversationAgent(llm=llm)\n\n# Execute a query\nresult = agent.exec(input_str='hello')\nprint(result)\n\n# Validate the model using Pydantic serialization and deserialization\nassert agent.id == SimpleConversationAgent.model_validate_json(agent.model_dump_json()).id\n\nConclusion\n\nIn this article, we’ve demonstrated how to use the Swarmauri SDK to handle various LLMs through Pydantic deserialization and reserialization. With examples using GroqModel, OpenAIModel, and PerplexityModel, you can observe the efficiency and robustness that Pydantic brings to the table in managing data integrity and model consistency.\n\nThe SimpleConversationAgent serves as a versatile agent class capable of integrating with different LLMs, making the Swarmauri framework highly adaptable for your AI application needs. The use of Pydantic serialization and deserialization ensures that data remains validated and consistent across various operations, facilitating reliable integrations and extensibility within your projects.\n\nJoin Us\n\nWe are continually working to make Swarmauri a powerful toolset for developers and data scientists. Your contributions, feedback, and engagement are what make this project thrive.\n\n- GitHub Repository\n\n- Community Discord\n\nThank you for being part of the Swarmauri community. Together, let’s make text processing and machine learning more accessible and powerful than ever!\n\nHappy Coding! 🚀",
    "legacyPath": "/2024/07/08/serialization-and-swarmauri/",
    "modified": "2024-09-10",
    "tags": [
      "groq",
      "LLMs",
      "openai",
      "perplexity",
      "pydantic",
      "serialization"
    ]
  },
  {
    "id": "archive-swarmauri-sdk",
    "title": "the swarmauri sdk",
    "date": "2024-04-08",
    "category": "Release Notes",
    "summary": "Swarmauri’s SDK is a powerful open-source platform that allows developers to build, test, and deploy AI agents efficiently. It provides a robust set of tools aimed at simplifying the creation of production-grade AI systems. Key features include a modular ar...",
    "content": "Swarmauri’s SDK is a powerful open-source platform that allows developers to build, test, and deploy AI agents efficiently. It provides a robust set of tools aimed at simplifying the creation of production-grade AI systems. Key features include a modular architecture, community plugins, and detailed examples to help users get started with ease.\n\nCore Features\n\nModular Architecture\n\nThe Swarmauri SDK is designed around a flexible, component-based structure. Developers can leverage built-in APIs for agent creation, conversations, document processing, and embeddings, among others. This makes it easier to tailor AI solutions to specific tasks or industries, whether it’s healthcare, finance, or manufacturing.\n\nExtensive Library of Plugins\n\nOne standout feature of Swarmauri is its collection of community-driven plugins. These pre-built components allow developers to extend functionality quickly, such as implementing chunking algorithms for text processing or integrating custom document stores. Swarmauri also supports Jupyter Notebooks for easy experimentation and model testing.\n\nAgent Factories & Tools\n\nThe SDK includes powerful agent creation tools that simplify the process of building AI workflows. Developers can define, register, and deploy agents using built-in APIs while leveraging standard classes for embedding and document management. Swarmauri is highly focused on helping users create scalable AI solutions through reusable components and workflows.\n\nContinuous Update\n\nSwarmauri is actively maintained, with frequent updates that improve the SDK’s modularity and performance. This includes improvements in serialization methods, component libraries, and community-driven features such as advanced tracing and embedding functionality.\n\nJoin us\n\nFor those looking to dive deeper, the SDK is available on GitHub, and detailed documentation can be accessed here. You can install the SDK using Python with the command:\n\npip install swarmauri[full]\n\nOverall, the Swarmauri SDK offers a comprehensive set of tools for AI developers seeking to build sophisticated, modular solutions in a streamlined and efficient manner.",
    "legacyPath": "/2024/04/08/swarmauri-sdk/",
    "modified": "2024-09-10",
    "tags": [
      "developer",
      "engineering",
      "programming",
      "python",
      "sdk",
      "software"
    ]
  }
];

export const LEGACY_PAGES: LegacyPageRecord[] = [
  {
    "id": "about",
    "title": "About",
    "date": "2024-09-01",
    "modified": "2024-09-07",
    "summary": "Swarmauri is an open-source AI platform that enables developers to build, test, and deploy AI models efficiently. With over 100 models integrated across various LLM providers, Swarmauri stands out as a versatile solution for both individual developers and e...",
    "content": "Swarmauri is an open-source AI platform that enables developers to build, test, and deploy AI models efficiently. With over 100 models integrated across various LLM providers, Swarmauri stands out as a versatile solution for both individual developers and enterprises. By being open-source, Swarmauri encourages collaboration and innovation, allowing the community to contribute to and extend the platform with new capabilities and plugins.\n\nThe platform also offers in-house and integrated vector database solutions, supporting scalable storage and retrieval for AI models, particularly in applications like Retrieval-Augmented Generation (RAG). Swarmauri’s flexible and modular architecture is designed to handle a variety of agent strategies, including:\n\n- QA Assistants: Specializing in question-answering tasks with precise and accurate results.\n\n- Conversational AI: For creating intelligent and responsive chatbots.\n\n- Tool-Empowered Assistants: Agents that can autonomously complete tasks by interacting with external tools.\n\n- RAG Assistants: Merging real-time data retrieval with AI to provide contextually rich, on-demand insights.\n\nAs part of its expansion, Swarmauri is venturing into multimodal AI, integrating multiple data types such as text, images, and other media to develop more comprehensive AI solutions. The open-source nature of Swarmauri makes it a collaborative, adaptable platform for developers who are looking to build and scale complex AI systems.",
    "legacyPath": "/about/",
    "tags": []
  },
  {
    "id": "careers",
    "title": "Careers",
    "date": "2024-09-01",
    "modified": "2024-09-02",
    "summary": "Careers legacy page.",
    "content": "This legacy page did not include body content in the prior Swarmauri website export.",
    "legacyPath": "/careers/",
    "tags": []
  },
  {
    "id": "contact",
    "title": "Contact",
    "date": "2024-09-01",
    "modified": "2024-09-01",
    "summary": "We’d love to hear from you! Whether you have a question about our services, pricing, need support, or anything else, our team is ready to answer all your questions. Get in Touch Email:support@swarmauri.com Follow Us Stay connected and follow us on social me...",
    "content": "We’d love to hear from you! Whether you have a question about our services, pricing, need support, or anything else, our team is ready to answer all your questions.\n\nGet in Touch\n\nEmail:\nsupport@swarmauri.com\n\n---\n\nFollow Us\n\nStay connected and follow us on social media for the latest updates:\n\n- GitHub: @Swarmauri\n\n- YouTube: @Swarmauri\n\n- X: @Swarmauri\n\n- LinkedIn: @Swarmauri\n\n- Medium: @Swarmauri\n\n---\n\nOffice Hours\n\nOur team is available to assist you during the following hours:\n\n- Monday to Friday: 9:00 AM – 6:00 PM\n\n- Saturday: 10:00 AM – 4:00 PM\n\n- Sunday: Closed\n\n---\n\nFrequently Asked Questions (FAQ)\n\nBefore contacting us, you might want to check our FAQ page to see if your question has already been answered.\n\n---\n\nPrivacy Policy\n\nYour privacy is important to us. Please read our Privacy Policy to understand how we handle your personal information.",
    "legacyPath": "/contact/",
    "tags": []
  },
  {
    "id": "docs",
    "title": "Swarmauri",
    "date": "2024-09-25",
    "modified": "2025-05-01",
    "summary": "Get the Docs In today’s rapidly evolving technological landscape, having robust, adaptable, and well-documented software development kits (SDKs) is paramount. Enter Swarmauri – a groundbreaking SDK designed to elevate your development experience by providin...",
    "content": "Get the Docs\n\nIn today’s rapidly evolving technological landscape, having robust, adaptable, and well-documented software development kits (SDKs) is paramount. Enter Swarmauri – a groundbreaking SDK designed to elevate your development experience by providing a powerful suite of tools for building scalable, efficient, and intelligent systems. To help you navigate and maximize the potential of Swarmauri, we proudly present our documentation hub.\n\nWhy Swarmauri?\n\nSwarmauri stands out in the crowded field of SDKs due to its unique focus on:\n\n- Modularity and Scalability: With Swarmauri, you can easily build modular applications that are both scalable and maintainable.\n\n- Integration Capabilities: Swarmauri supports seamless integration with various technologies, empowering you to create complex, distributed systems with ease.\n\n- Advanced Tools: From sophisticated natural language processing tools to powerful data chunkers and embeddings, Swarmauri equips developers with NLP and Data Analytical functionalities to solve real-world problems efficiently.\n\nNavigating Swarmauri Documentation\n\nOur documentation is meticulously crafted to cater to a wide range of users – from beginners to advanced developers, open-source contributors, backend engineers, and solution architects. Here’s what you can expect from our documentation:\n\n- Getting Started Guides: These guides help you kickstart your journey with Swarmauri, covering installation steps, initial configuration, and basic usage.\n\n- In-Depth Tutorials: For those looking to delve deeper, we offer tutorials that explore various facets of the SDK.\n\n- API References: Detailed API documentation ensures you have all the information at your fingertips, enabling you to leverage Swarmauri’s full potential.\n\n- Component Walkthroughs: Understand how to effectively use and extend Swarmauri’s diverse components, from parsers and chunkers to embeddings and metrics.\n\n- Advanced Topics: For seasoned developers and architects, our documentation covers advanced topics such as designing scalable architectures, implementing high-availability systems, and optimizing performance.\n\nHow to Access\n\nTo explore the full range of our documentation, simply visit docs.swarmauri.com. This hub serves as your one-stop destination for all things Swarmauri, providing structured, easy-to-navigate content that caters to your specific needs.\n\nJoin the Swarmauri Community\n\nSwarmauri is more than just an SDK – it’s a community of innovators and problem-solvers. We encourage you to:\n\n- Contribute: Our open-source ecosystem thrives on contributions from developers like you. Whether it’s fixing bugs, adding features, or improving documentation, your input is valuable.\n\n- Collaborate: Connect with other Swarmauri users, share your experiences, and collaborate on projects to push the boundaries of what’s possible.\n\nConclusion\n\nThe Swarmauri documentation hub is designed to empower you with the knowledge and tools necessary to harness the full potential of our SDK. Whether you’re just starting out or are an experienced developer, our documentation provides the resources you need to build robust, scalable, and intelligent systems. Dive into the Swarmauri documentation today and begin your journey towards unparalleled development excellence.\n\n© 2023 Swarmauri. All rights reserved.",
    "legacyPath": "/docs/",
    "tags": []
  },
  {
    "id": "faq",
    "title": "faq",
    "date": "2024-09-01",
    "modified": "2024-09-02",
    "summary": "Q: Where can I see Swarmauri’s code?A: Clone the repository from GitHub Q: How do I install Swarmauri?A: Q: What are the prerequisites for installing Swarmauri?A: Ensure you have Python, pip, and other dependencies installed before installing Swarmauri. Q:...",
    "content": "Q: Where can I see Swarmauri’s code?\nA: Clone the repository from GitHub\n\nQ: How do I install Swarmauri?\nA:\n\npip install swarmauri[full]==0.4.1\n\nQ: What are the prerequisites for installing Swarmauri?\nA: Ensure you have Python, pip, and other dependencies installed before installing Swarmauri.\n\nQ: How can I contribute to Swarmauri?\nA: Contribute to Swarmauri by:\n\n- Reporting issues on GitHub\n\n- Submitting pull requests for new features or bug fixes\n\n- Participating in discussions on our community forum\n\nQ: Where can I watch videos and tutorials on using Swarmauri?\nA: Watch videos and tutorials on:\n\n- Our official YouTube channel\n\n- Our website’s tutorial section\n\n- Our community forum’s video section\n\nQ: Are there any step-by-step guides available?\nA: Yes, check our website’s documentation section for step-by-step guides and tutorials.\n\nQ: Where can I find more information about Swarmauri?\nA: Yes, join our Discord community forum to discuss Swarmauri with other users and developers.",
    "legacyPath": "/faq/",
    "tags": []
  },
  {
    "id": "privacy-policy",
    "title": "Privacy Policy",
    "date": "2024-09-01",
    "modified": "2024-09-01",
    "summary": "Privacy Policy legacy page.",
    "content": "This legacy page did not include body content in the prior Swarmauri website export.",
    "legacyPath": "/privacy-policy/",
    "tags": []
  },
  {
    "id": "services-and-solutions",
    "title": "Services & Solutions",
    "date": "2025-05-03",
    "modified": "2025-05-03",
    "summary": "Empower Your Business Through Tailored Solutions At Swarmauri, we specialize in crafting custom software, delivering AI-driven insights, building intelligent cloud platforms, and providing innovative design services. Our comprehensive technology solutions s...",
    "content": "Empower Your Business Through Tailored Solutions\n\nAt Swarmauri, we specialize in crafting custom software, delivering AI-driven insights, building intelligent cloud platforms, and providing innovative design services. Our comprehensive technology solutions simplify complexity, boost performance, and accelerate your innovation journey.\n\n---\n\nOur Core Services\n\nCustom Software Development\n\n- Tailored development of robust, scalable Python and JavaScript applications.\n\n- Modern web frameworks including Vue.js, Svelte, and React to build intuitive and dynamic user experiences.\n\nQuality Assurance & Testing\n\n- Implement rigorous Test-driven Development (TDD) methodologies.\n\n- Automated and manual testing services ensuring your software is reliable and high-quality.\n\nArchitecture & Design\n\n- Strategic software architecture to ensure scalable, secure, and maintainable solutions.\n\n- Comprehensive UI/UX and graphic design services that enhance user interaction and brand visibility.\n\nCloud & Platform Solutions\n\n- Cloud-native application development designed for scalability and security.\n\n- Cloud automation and intelligent automation to streamline and optimize your business processes.\n\nAI, ML, and Data Science\n\n- Advanced AI and machine learning consulting, integration, and orchestration.\n\n- Data science analytics services transforming data into actionable insights.\n\n- Specialized LLM (Large Language Model) integration and orchestration to enhance your applications.\n\nSoftware Staffing\n\n- Flexible staff augmentation to rapidly scale your teams with top talent.\n\n- Dedicated technical teams tailored specifically to your project requirements.\n\n- Expertise available across all major roles including Developers, QA specialists, UI/UX designers, and Project Managers.\n\n---\n\nWhy Choose Swarmauri?\n\n- Expertise: Highly skilled professionals with extensive industry experience.\n\n- Innovation: Commitment to innovative solutions aligned with your business goals.\n\n- Quality: Proven methodologies ensuring excellence and reliability in every delivery.\n\n- Partnership: Collaborative approach ensuring seamless integration with your business.\n\n---\n\nGet Started Today\n\nReady to accelerate your innovation journey?\n\nSchedule a Consultation or Contact Our Team to learn more.",
    "legacyPath": "/services-and-solutions/",
    "tags": []
  },
  {
    "id": "terms-of-service",
    "title": "Terms of Service",
    "date": "2024-09-01",
    "modified": "2024-09-01",
    "summary": "Terms of Service legacy page.",
    "content": "This legacy page did not include body content in the prior Swarmauri website export.",
    "legacyPath": "/terms-of-service/",
    "tags": []
  }
];

function normalizeLegacyPath(pathname: string): string {
  const base = pathname.split("?")[0].split("#")[0];
  return base.endsWith("/") ? base : base + "/";
}

export function findLegacyUpdateByPath(pathname: string): LegacyUpdatePost | undefined {
  const normalized = normalizeLegacyPath(pathname);
  return LEGACY_UPDATE_POSTS.find((post) => post.legacyPath === normalized);
}

export function findLegacyPageByPath(pathname: string): LegacyPageRecord | undefined {
  const normalized = normalizeLegacyPath(pathname);
  return LEGACY_PAGES.find((page) => page.legacyPath === normalized);
}
