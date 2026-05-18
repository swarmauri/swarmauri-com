export type ImportedArticle = {
  wpType: "post" | "page";
  wpId: number;
  slug: string;
  legacyPath: string;
  canonicalUrl: string;
  title: string;
  excerptHtml: string;
  contentHtml: string;
  date: string;
  modified: string;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  authorId: number;
  authorName: string;
  authorSlug: string;
  authorLink: string;
};

export const importedArticles: ImportedArticle[] = [
  {
    "wpType": "post",
    "wpId": 120,
    "slug": "swarmauri-sdk",
    "legacyPath": "/2024/04/08/swarmauri-sdk/",
    "canonicalUrl": "https://swarmauri.com/2024/04/08/swarmauri-sdk/",
    "title": "the swarmauri sdk",
    "excerptHtml": "<p>Swarmauri’s SDK is a powerful open-source platform that allows developers to build, test, and deploy AI agents efficiently. It provides a robust set of tools aimed at simplifying the creation of production-grade AI systems. Key features include a modular architecture, community plugins, and detailed examples to help users get started with ease. Core Features Modular [&hellip;]</p>\n",
    "contentHtml": "\n<p>Swarmauri’s SDK is a powerful open-source platform that allows developers to build, test, and deploy AI agents efficiently. It provides a robust set of tools aimed at simplifying the creation of production-grade AI systems. Key features include a modular architecture, community plugins, and detailed examples to help users get started with ease.</p>\n\n\n\n<h3 class=\"wp-block-heading has-luminous-vivid-orange-color has-text-color has-link-color wp-elements-b7165021dd9fe7b65ed87ba6457802e6\">Core Features</h3>\n\n\n\n<h4 class=\"wp-block-heading\"><strong>Modular Architecture</strong></h4>\n\n\n\n<p>The Swarmauri SDK is designed around a flexible, component-based structure. Developers can leverage built-in APIs for agent creation, conversations, document processing, and embeddings, among others. This makes it easier to tailor AI solutions to specific tasks or industries, whether it&#8217;s healthcare, finance, or manufacturing.</p>\n\n\n\n<h4 class=\"wp-block-heading\"><strong>Extensive Library of Plugins</strong></h4>\n\n\n\n<p>One standout feature of Swarmauri is its collection of community-driven plugins. These pre-built components allow developers to extend functionality quickly, such as implementing chunking algorithms for text processing or integrating custom document stores. Swarmauri also supports Jupyter Notebooks for easy experimentation and model testing.</p>\n\n\n\n<h4 class=\"wp-block-heading\"><strong>Agent Factories &amp; Tools</strong></h4>\n\n\n\n<p>The SDK includes powerful agent creation tools that simplify the process of building AI workflows. Developers can define, register, and deploy agents using built-in APIs while leveraging standard classes for embedding and document management. Swarmauri is highly focused on helping users create scalable AI solutions through reusable components and workflows.</p>\n\n\n\n<h4 class=\"wp-block-heading\"><strong>Continuous Update</strong></h4>\n\n\n\n<p class=\"has-text-align-left\">Swarmauri is <strong>actively </strong>maintained, with frequent updates that improve the SDK’s modularity and performance. This includes improvements in serialization methods, component libraries, and community-driven features such as advanced tracing and embedding functionality.</p>\n\n\n\n<h3 class=\"wp-block-heading has-luminous-vivid-orange-color has-text-color has-link-color wp-elements-b073acecc2e0291ee99ecd2b9ceb9cd3\">Join us</h3>\n\n\n\n<p>For those looking to dive deeper, the SDK is available on <a href=\"https://github.com/swarmauri/swarmauri-sdk\">GitHub</a>, and detailed documentation can be accessed <a href=\"https://docs.swarmauri.com/index.html\">here</a>. You can install the SDK using Python with the command:</p>\n\n\n\n<pre class=\"wp-block-code has-vivid-green-cyan-color has-background-background-color has-text-color has-background has-link-color wp-elements-c92c83e478c561b9d10a46240418b6c7\"><code><code>pip install swarmauri&#91;full]\n</code></code></pre>\n\n\n\n<p>Overall, the Swarmauri SDK offers a comprehensive set of tools for AI developers seeking to build sophisticated, modular solutions in a streamlined and efficient manner.</p>\n\n\n\n<p></p>\n",
    "date": "2024-04-08T16:22:00",
    "modified": "2024-09-10T16:23:26",
    "categories": [
      "Releases"
    ],
    "tags": [
      "developer",
      "engineering",
      "programming",
      "python",
      "sdk",
      "software"
    ],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "post",
    "wpId": 1,
    "slug": "serialization-and-swarmauri",
    "legacyPath": "/2024/07/08/serialization-and-swarmauri/",
    "canonicalUrl": "https://swarmauri.com/2024/07/08/serialization-and-swarmauri/",
    "title": "serialization and swarmauri",
    "excerptHtml": "<p>In contemporary AI applications, especially those involving Large Language Models (LLMs), efficient data handling and model management are paramount. The Swarmauri SDK provides robust support for various LLM integrations using Pydantic, which powers seamless serialization and deserialization of models and configurations. We will walk you through using Pydantic deserialization and reserialization with three different LLM [&hellip;]</p>\n",
    "contentHtml": "\n<p>In contemporary AI applications, especially those involving Large Language Models (LLMs), efficient data handling and model management are paramount. The Swarmauri SDK provides robust support for various LLM integrations using Pydantic, which powers seamless serialization and deserialization of models and configurations. </p>\n\n\n\n<p></p>\n\n\n\n<p>We will walk you through using Pydantic deserialization and reserialization with three different LLM types within Swarmauri: GroqModel, OpenAIModel, and PerplexityModel. </p>\n\n\n\n<h1 class=\"wp-block-heading\" id=\"2c03\">Prerequisites</h1>\n\n\n\n<p id=\"94b4\">Before diving into the examples, ensure you have the Swarmauri SDK installed in your Python environment. Please note, the SDK is still in beta.</p>\n\n\n\n<pre class=\"wp-block-code\"><code>pip install swarmauri&#91;full]==0.4.1</code></pre>\n\n\n\n<h2 class=\"wp-block-heading\" id=\"b8ae\">GroqModel with SimpleConversationAgent</h2>\n\n\n\n<p id=\"f923\">Let’s begin with how you might use the&nbsp;<code>GroqModel</code>&nbsp;and verify the model&#8217;s integrity through serialization and deserialization using Pydantic.</p>\n\n\n\n<pre class=\"wp-block-code\"><code>import os<br>from swarmauri.standard.llms.concrete.GroqModel import GroqModel<br>from swarmauri.standard.agents.concrete.SimpleConversationAgent import SimpleConversationAgent<br><br># Initialize the GroqModel<br>API_KEY = os.getenv('GROQ_API_KEY')<br>llm = GroqModel(api_key=API_KEY)<br><br># Create a SimpleConversationAgent with the GroqModel<br>agent = SimpleConversationAgent(llm=llm)<br><br># Execute a query<br>result = agent.exec(input_str='hello')<br>print(result)<br><br># Validate the model using Pydantic serialization and deserialization<br>assert agent.id == SimpleConversationAgent.model_validate_json(agent.model_dump_json()).id</code></pre>\n\n\n\n<h2 class=\"wp-block-heading\" id=\"ee2e\">OpenAIModel with SimpleConversationAgent</h2>\n\n\n\n<p>Now, let’s see a similar example using&nbsp;<code>OpenAIModel</code>.</p>\n\n\n\n<pre class=\"wp-block-code\"><code>import os\nfrom swarmauri.standard.llms.concrete.OpenAIModel import OpenAIModel\nfrom swarmauri.standard.agents.concrete.SimpleConversationAgent import SimpleConversationAgent\n\n# Initialize the OpenAIModel\nAPI_KEY = os.getenv('OPENAI_API_KEY')\nllm = OpenAIModel(api_key=API_KEY)\n\n# Create a SimpleConversationAgent with the OpenAIModel\nagent = SimpleConversationAgent(llm=llm)\n\n# Execute a query\nresult = agent.exec(input_str='hello')\nprint(result)\n\n# Validate the model using Pydantic serialization and deserialization\nassert agent.id == SimpleConversationAgent.model_validate_json(agent.model_dump_json()).id\n</code></pre>\n\n\n\n<h2 class=\"wp-block-heading\" id=\"1879\">PerplexityModel with SimpleConversationAgent</h2>\n\n\n\n<p id=\"2553\">Finally, let’s leverage the&nbsp;<code>PerplexityModel</code>.</p>\n\n\n\n<pre class=\"wp-block-code\"><code>import os\nfrom swarmauri.standard.llms.concrete.PerplexityModel import PerplexityModel\nfrom swarmauri.standard.agents.concrete.SimpleConversationAgent import SimpleConversationAgent\n\n# Initialize the PerplexityModel\nAPI_KEY = os.getenv('PERPLEXITY_API_KEY')\nllm = PerplexityModel(api_key=API_KEY)\n\n# Create a SimpleConversationAgent with the PerplexityModel\nagent = SimpleConversationAgent(llm=llm)\n\n# Execute a query\nresult = agent.exec(input_str='hello')\nprint(result)\n\n# Validate the model using Pydantic serialization and deserialization\nassert agent.id == SimpleConversationAgent.model_validate_json(agent.model_dump_json()).id</code></pre>\n\n\n\n<h1 class=\"wp-block-heading\" id=\"d8ac\">Conclusion</h1>\n\n\n\n<p id=\"ae19\">In this article, we’ve demonstrated how to use the Swarmauri SDK to handle various LLMs through Pydantic deserialization and reserialization. With examples using&nbsp;<code>GroqModel</code>,&nbsp;<code>OpenAIModel</code>, and&nbsp;<code>PerplexityModel</code>, you can observe the efficiency and robustness that Pydantic brings to the table in managing data integrity and model consistency.</p>\n\n\n\n<p id=\"2b0a\">The&nbsp;<code>SimpleConversationAgent</code>&nbsp;serves as a versatile agent class capable of integrating with different LLMs, making the Swarmauri framework highly adaptable for your AI application needs. The use of Pydantic serialization and deserialization ensures that data remains validated and consistent across various operations, facilitating reliable integrations and extensibility within your projects.</p>\n\n\n\n<h1 class=\"wp-block-heading\" id=\"fbaa\">Join Us</h1>\n\n\n\n<p id=\"8ce8\">We are continually working to make Swarmauri a powerful toolset for developers and data scientists. Your contributions, feedback, and engagement are what make this project thrive.</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li><a href=\"https://github.com/swarmauri/swarmauri_sdk\" target=\"_blank\" rel=\"noreferrer noopener\"><strong>GitHub Repository</strong></a></li>\n\n\n\n<li><a href=\"https://discord.gg/nBKuZ36x9Q\" target=\"_blank\" rel=\"noreferrer noopener\"><strong>Community Discord</strong></a></li>\n</ul>\n\n\n\n<p id=\"ccbb\">Thank you for being part of the Swarmauri community. Together, let’s make text processing and machine learning more accessible and powerful than ever!</p>\n\n\n\n<p>Happy Coding! 🚀</p>\n",
    "date": "2024-07-08T21:01:00",
    "modified": "2024-09-10T16:24:00",
    "categories": [
      "News"
    ],
    "tags": [
      "groq",
      "LLMs",
      "openai",
      "perplexity",
      "pydantic",
      "serialization"
    ],
    "featuredImage": "https://swarmauri.com/wp-content/uploads/2024/09/DALL·E-2024-07-31-02.41.24-A-clean-infographic-styled-image-with-a-green-yellow-and-orange-color-palette.-The-infographic-connects-a-cluster-of-chat-bubbles-to-different-types2.webp",
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "post",
    "wpId": 46,
    "slug": "release-v0-4-1-sdk",
    "legacyPath": "/2024/09/01/release-v0-4-1-sdk/",
    "canonicalUrl": "https://swarmauri.com/2024/09/01/release-v0-4-1-sdk/",
    "title": "sdk release v0.4.1",
    "excerptHtml": "<p>A Supercharged Swarmauri Engineer</p>\n",
    "contentHtml": "\n<p>The wait is over! Swarmauri, a forthcoming open-source LLM orchestration designed to empower developers, innovators, and businesses to build and deploy AI applications efficiently, has just released its latest version, v0.4.1. This beta release is packed with exciting new features, improvements, and bug fixes, setting a new standard for efficiency and innovation.</p>\n\n\n\n<h2 class=\"wp-block-heading\">What&#8217;s new?</h2>\n\n\n\n<p>The v0.4.1 release is a testament to the dedication and expertise of the Swarmauri team, led by @cobycloud. </p>\n\n\n\n<p>This update introduces several significant enhancements, including: </p>\n\n\n\n<p>🆕 7 New Distance Calculation Formulas: Extend your capability with the inclusion of 7 advanced distance calculation methods. </p>\n\n\n\n<p>🆕AI Studio Model: Introducing the new AI Studio Model, a powerful tool designed to streamline your AI development process. </p>\n\n\n\n<p>🆕 Deep Seek Model: Meet the new Deep Seek Model, designed to push the boundaries of AI search and discovery. </p>\n\n\n\n<p>🆕 ShuttleAI Model: Get a sneak peek at our upcoming experimental ShuttleAI Model, now with improved tests and parameterization. </p>\n\n\n\n<p>🆕Markdown to HTML Parser: Convert markdown to HTML effortlessly with our new parser.</p>\n\n\n\n<p>🛠️Issue Templates: Streamlined issue templates for better organization and communication amongst open-source contributors. </p>\n\n\n\n<h2 class=\"wp-block-heading\">Contributors</h2>\n\n\n\n<p>This release wouldn&#8217;t have been possible without the valuable contributions of new team members: </p>\n\n\n\n<p>@faizan2700 </p>\n\n\n\n<p>@John Kagunda </p>\n\n\n\n<p>@Techie-John </p>\n\n\n\n<p>@abdulsamodazeez </p>\n\n\n\n<h2 class=\"wp-block-heading\">Upgrade</h2>\n\n\n\n<p>Get Ready to Upgrade! Swarmauri v0.4.1 is now available for <a href=\"https://github.com/swarmauri/swarmauri-notebooks/blob/v0.4.1.dev1/examples/Getting%20Started/getting-started.ipynb\" data-type=\"link\" data-id=\"https://github.com/swarmauri/swarmauri-notebooks/blob/v0.4.1.dev1/examples/Getting%20Started/getting-started.ipynb\">install!</a></p>\n",
    "date": "2024-09-01T21:39:19",
    "modified": "2024-09-10T16:24:52",
    "categories": [
      "Releases"
    ],
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
    ],
    "featuredImage": "https://swarmauri.com/wp-content/uploads/2024/09/Screenshot-2024-08-17-061641.png",
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "post",
    "wpId": 181,
    "slug": "swarmauri-sdk-release-0_5_0",
    "legacyPath": "/2024/10/02/swarmauri-sdk-release-0_5_0/",
    "canonicalUrl": "https://swarmauri.com/2024/10/02/swarmauri-sdk-release-0_5_0/",
    "title": "sdk release v0.5.0",
    "excerptHtml": "<p>This release introduces significant changes to the Swarmauri codebase, improving toolkit imports and LLM tool accessibility. Changes and Enhancements: Upgrade Instructions: Install the updated SDK using pip: Add the new environment to Jupyter kernels: Important Notes: Documentation: Refer to the Swarmauri&#8217;s official documentation for updated examples and guidelines.</p>\n",
    "contentHtml": "\n<blockquote class=\"wp-block-quote is-layout-flow wp-block-quote-is-layout-flow\">\n<p><code>This release introduces significant changes to the Swarmauri codebase, improving toolkit imports and LLM tool accessibility.</code></p>\n</blockquote>\n\n\n\n<p>Changes and Enhancements:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Renamed swarmauri.standard to swarmauri for toolkit imports</li>\n\n\n\n<li>Renamed swarmauri.community to swarmauri_community for LLM tool imports.</li>\n</ul>\n\n\n\n<p>Upgrade Instructions:</p>\n\n\n\n<p>Install the updated SDK using pip:</p>\n\n\n\n<pre class=\"wp-block-code has-tiny-font-size\"><code><code>pip install swarmauri==0.5.0 swarmauri_community==0.5.0 jupyter ipykernel</code></code></pre>\n\n\n\n<p>Add the new environment to Jupyter kernels:</p>\n\n\n\n<pre class=\"wp-block-code has-tiny-font-size\"><code><code>python -m ipykernel install --user --name=swarmauri-0.5.0 --display-name \"swarmauri(0.5.0)\"</code></code></pre>\n\n\n\n<p>Important Notes:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Update your imports to reflect the new naming conventions.</li>\n\n\n\n<li>Replace swarmauri.standard with swarmauri for toolkit imports.</li>\n\n\n\n<li>Replace swarmauri.community with swarmauri_community for LLM tool imports.</li>\n</ul>\n\n\n\n<p>Documentation:</p>\n\n\n\n<p>Refer to the Swarmauri&#8217;s official documentation for updated examples and guidelines.</p>\n\n\n\n<p></p>\n",
    "date": "2024-10-02T10:49:12",
    "modified": "2024-10-02T10:49:52",
    "categories": [
      "Releases"
    ],
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
    ],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "post",
    "wpId": 188,
    "slug": "sdk-release-v0-5-2",
    "legacyPath": "/2024/11/21/sdk-release-v0-5-2/",
    "canonicalUrl": "https://swarmauri.com/2024/11/21/sdk-release-v0-5-2/",
    "title": "sdk release v0.5.2",
    "excerptHtml": "<p>Swarmauri v0.5.2 is here! And guess what? The installation process is now way faster and super seamless. This update tackles some of the issues a few of you ran into earlier, so give it a shot and let us know how it goes. This update is all about speed 🏎️ and reliability, with extra robustness [&hellip;]</p>\n",
    "contentHtml": "\n<p><strong>Swarmauri v0.5.2 is here!</strong></p>\n\n\n\n<p>And guess what? The installation process is now <strong>way faster</strong> and <strong>super seamless.</strong> This update tackles some of the issues a few of you ran into earlier, so give it a shot and let us know how it goes.</p>\n\n\n\n<p>This update is all about <strong>speed</strong> 🏎️</p>\n\n\n\n<p>and <strong>reliability</strong>, with <strong>extra robustness</strong> and <strong>multimodal features</strong> to make your builds feel effortless. Whether you’re just starting out or deep into a project, this version is designed to be your smoothest ride yet.</p>\n\n\n\n<p><strong>Pro Tip:</strong> Update now and experience the difference!</p>\n\n\n\n<p><br><strong>Ready to dive in? Just run:</strong></p>\n\n\n\n<pre class=\"wp-block-code\"><code>pip install swarmauri</code></pre>\n\n\n\n<p><a href=\"https://pypi.org/project/swarmauri/0.5.2/\" target=\"_blank\" rel=\"noreferrer noopener\">Check out v0.5.2 on PyPI</a></p>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<p><br>As always, we’re here to help if you hit any bumps along the way—just ping us!</p>\n\n\n\n<p><strong>Happy building, and don’t forget to let us know what you think!</strong></p>\n\n\n\n<p></p>\n",
    "date": "2024-11-21T14:28:39",
    "modified": "2024-11-21T14:30:31",
    "categories": [
      "Releases"
    ],
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
    ],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "post",
    "wpId": 200,
    "slug": "crouton-v0-0-4-dev",
    "legacyPath": "/2024/12/07/crouton-v0-0-4-dev/",
    "canonicalUrl": "https://swarmauri.com/2024/12/07/crouton-v0-0-4-dev/",
    "title": "crouton pre-release v0.0.4",
    "excerptHtml": "<p>Try the Latest Development Release of Crouton! We&#8217;ve just released the latest development version of Crouton, our python-powered CRUD route generator. It&#8217;s packed with improvements, and we&#8217;d love for you to give it a try and share your feedback! 🙌 Why Crouton? Crouton makes API development easier by: How to Install the Development Release Installing [&hellip;]</p>\n",
    "contentHtml": "\n<p class=\"has-text-align-center\"><strong>Try the Latest Development Release of Crouton!</strong> </p>\n\n\n\n<p>We&#8217;ve just released the latest development version of <strong>Crouton</strong>, our python-powered CRUD route generator. It&#8217;s packed with improvements, and we&#8217;d love for you to give it a try and share your feedback! 🙌</p>\n\n\n\n<h3 class=\"wp-block-heading\"><strong>Why Crouton?</strong></h3>\n\n\n\n<p>Crouton makes API development easier by:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Automating CRUD route generation for FastAPI.</li>\n\n\n\n<li>Offering quick customization options.</li>\n\n\n\n<li>Freeing up your time to focus on the core logic of your application.</li>\n</ul>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<h3 class=\"wp-block-heading\"><strong>How to Install the Development Release</strong></h3>\n\n\n\n<p>Installing Crouton is simple! Run the following command to get the latest development version:</p>\n\n\n\n<pre class=\"wp-block-preformatted\"><code>pip install -U crouton --pre<br></code></pre>\n\n\n\n<p>💡 <strong>Note</strong>: The <code>--pre</code> flag ensures you&#8217;re downloading the pre-release version.</p>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<h3 class=\"wp-block-heading\"><strong>Get Started</strong></h3>\n\n\n\n<p>Once installed, check out our <a href=\"https://github.com/swarmauri/crouton\">GitHub repository</a> for:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Full documentation 📚</li>\n\n\n\n<li>Examples to kickstart your project 🚀</li>\n\n\n\n<li>Contribution guidelines 👩‍💻👨‍💻</li>\n</ul>\n\n\n\n<p>📦 You can also find Crouton on <a href=\"https://pypi.org/project/crouton\">PyPI</a> for easy package management.</p>\n",
    "date": "2024-12-07T11:29:31",
    "modified": "2024-12-07T11:30:03",
    "categories": [
      "Releases"
    ],
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
    ],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "post",
    "wpId": 210,
    "slug": "sdk-release-v0-6-1",
    "legacyPath": "/2025/03/04/sdk-release-v0-6-1/",
    "canonicalUrl": "https://swarmauri.com/2025/03/04/sdk-release-v0-6-1/",
    "title": "sdk release v0.6.1",
    "excerptHtml": "<p>What&#8217;s new? Give it a try: pip install swarmauri==0.6.1</p>\n",
    "contentHtml": "\n<p>What&#8217;s new?</p>\n\n\n\n<ol start=\"1\" class=\"wp-block-list\">\n<li>Introduction of our plugin architecture</li>\n\n\n\n<li>Release of 40+ standalone plugin packages</li>\n\n\n\n<li>YAML Validation</li>\n</ol>\n\n\n\n<p>Give it a try: </p>\n\n\n\n<p><code>pip install swarmauri==0.6.1</code></p>\n\n\n\n<p></p>\n",
    "date": "2025-03-04T00:51:00",
    "modified": "2025-05-01T00:53:51",
    "categories": [
      "Releases"
    ],
    "tags": [
      "artificial intelligence",
      "databases",
      "engineering",
      "LLMs",
      "python",
      "releases",
      "rest apis",
      "sdk"
    ],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "post",
    "wpId": 206,
    "slug": "sdk-release-v0-7-0",
    "legacyPath": "/2025/03/31/sdk-release-v0-7-0/",
    "canonicalUrl": "https://swarmauri.com/2025/03/31/sdk-release-v0-7-0/",
    "title": "sdk release v0.7.0",
    "excerptHtml": "<p>The Swarmauri SDK v0.7.0 is here! 🤔 ✔ Introduction of observability components (global and module-level logging) ! ✔ Blazing fast Implementation of UV! ✔ JupyterToolkit alpha (10+ ai tools to automate jupyter notebook workflows) pip install swarmauri==0.7.0 https://github.com/swarmauri/swarmauri-sdk/tree/v0.7.0</p>\n",
    "contentHtml": "\n<p>The Swarmauri SDK v0.7.0 is here! 🤔</p>\n\n\n\n<p>✔ Introduction of observability components (global and module-level logging) !</p>\n\n\n\n<p>✔ Blazing fast Implementation of UV!</p>\n\n\n\n<p>✔  JupyterToolkit alpha (10+ ai tools to automate jupyter notebook workflows) </p>\n\n\n\n<p><code>pip install swarmauri==0.7.0</code></p>\n\n\n\n<p><a href=\"https://github.com/swarmauri/swarmauri-sdk/tree/v0.7.0\" target=\"_blank\" rel=\"noreferrer noopener\">https://github.com/swarmauri/swarmauri-sdk/tree/v0.7.0</a></p>\n\n\n\n<p></p>\n",
    "date": "2025-03-31T00:49:21",
    "modified": "2025-05-01T00:54:17",
    "categories": [
      "Releases"
    ],
    "tags": [
      "artificial intelligence",
      "engineering",
      "LLMs",
      "programming",
      "python",
      "releases",
      "sdk",
      "software"
    ],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "page",
    "wpId": 36,
    "slug": "about",
    "legacyPath": "/about/",
    "canonicalUrl": "https://swarmauri.com/about/",
    "title": "About",
    "excerptHtml": "<p>Swarmauri is an open-source AI platform that enables developers to build, test, and deploy AI models efficiently. With over 100 models integrated across various LLM providers, Swarmauri stands out as a versatile solution for both individual developers and enterprises. By being open-source, Swarmauri encourages collaboration and innovation, allowing the community to contribute to and extend [&hellip;]</p>\n",
    "contentHtml": "\n<p>Swarmauri is an open-source AI platform that enables developers to build, test, and deploy AI models efficiently. With over 100 models integrated across various LLM providers, Swarmauri stands out as a versatile solution for both individual developers and enterprises. By being open-source, Swarmauri encourages collaboration and innovation, allowing the community to contribute to and extend the platform with new capabilities and plugins.</p>\n\n\n\n<p>The platform also offers in-house and integrated <strong>vector database</strong> solutions, supporting scalable storage and retrieval for AI models, particularly in applications like <strong>Retrieval-Augmented Generation (RAG)</strong>. Swarmauri’s flexible and modular architecture is designed to handle a variety of <strong>agent strategies</strong>, including:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li><strong>QA Assistants</strong>: Specializing in question-answering tasks with precise and accurate results.</li>\n\n\n\n<li><strong>Conversational AI</strong>: For creating intelligent and responsive chatbots.</li>\n\n\n\n<li><strong>Tool-Empowered Assistants</strong>: Agents that can autonomously complete tasks by interacting with external tools.</li>\n\n\n\n<li><strong>RAG Assistants</strong>: Merging real-time data retrieval with AI to provide contextually rich, on-demand insights.</li>\n</ul>\n\n\n\n<p>As part of its expansion, Swarmauri is venturing into <strong>multimodal AI</strong>, integrating multiple data types such as text, images, and other media to develop more comprehensive AI solutions. The open-source nature of Swarmauri makes it a collaborative, adaptable platform for developers who are looking to build and scale complex AI systems.</p>\n",
    "date": "2024-09-01T21:25:46",
    "modified": "2024-09-07T20:48:31",
    "categories": [],
    "tags": [],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "page",
    "wpId": 52,
    "slug": "careers",
    "legacyPath": "/careers/",
    "canonicalUrl": "https://swarmauri.com/careers/",
    "title": "Careers",
    "excerptHtml": "",
    "contentHtml": "\n<div class=\"wp-block-query is-layout-flow wp-block-query-is-layout-flow\"></div>\n",
    "date": "2024-09-01T21:57:38",
    "modified": "2024-09-02T00:03:35",
    "categories": [],
    "tags": [],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "page",
    "wpId": 27,
    "slug": "contact",
    "legacyPath": "/contact/",
    "canonicalUrl": "https://swarmauri.com/contact/",
    "title": "Contact",
    "excerptHtml": "<p>We&#8217;d love to hear from you! Whether you have a question about our services, pricing, need support, or anything else, our team is ready to answer all your questions. Get in Touch Email:support@swarmauri.com Follow Us Stay connected and follow us on social media for the latest updates: Office Hours Our team is available to assist [&hellip;]</p>\n",
    "contentHtml": "\n<p>We&#8217;d love to hear from you! Whether you have a question about our services, pricing, need support, or anything else, our team is ready to answer all your questions.</p>\n\n\n\n<h4 class=\"wp-block-heading\"><strong>Get in Touch</strong></h4>\n\n\n\n<p><strong>Email:</strong><br><a>support@swarmauri.com</a></p>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<h4 class=\"wp-block-heading\"><strong>Follow Us</strong></h4>\n\n\n\n<p>Stay connected and follow us on social media for the latest updates:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li><strong>GitHub:</strong> <a href=\"https://github.com/swarmauri\" data-type=\"link\" data-id=\"https://github.com/swarmauri\">@Swarmauri</a></li>\n\n\n\n<li><strong>YouTube:</strong> <a href=\"https://linked.com/company/swarmauri\">@</a><a href=\"https://www.youtube.com/@swarmauri\">Swarmauri</a></li>\n\n\n\n<li>X<strong>:</strong> <a href=\"https://x.com/swarmauri\" data-type=\"link\" data-id=\"https://x.com/swarmauri\">@Swarmauri</a></li>\n\n\n\n<li><strong>LinkedIn:</strong> <a href=\"https://linked.com/company/swarmauri\">@Swarmauri</a></li>\n\n\n\n<li><strong>Medium:</strong> <a href=\"https://linked.com/company/swarmauri\">@</a><a href=\"https://medium.com/@swarmauri\" data-type=\"link\" data-id=\"https://medium.com/@swarmauri\">Swarmauri</a></li>\n</ul>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<h4 class=\"wp-block-heading\"><strong>Office Hours</strong></h4>\n\n\n\n<p>Our team is available to assist you during the following hours:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li><strong>Monday to Friday:</strong> 9:00 AM &#8211; 6:00 PM</li>\n\n\n\n<li><strong>Saturday:</strong> 10:00 AM &#8211; 4:00 PM</li>\n\n\n\n<li><strong>Sunday:</strong> Closed</li>\n</ul>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<h3 class=\"wp-block-heading\">Frequently Asked Questions (FAQ)</h3>\n\n\n\n<p>Before contacting us, you might want to check our <a href=\"https://swarmauri.com/?page_id=81\" data-type=\"page\" data-id=\"81\">FAQ</a> page to see if your question has already been answered.</p>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<h3 class=\"wp-block-heading\">Privacy Policy</h3>\n\n\n\n<p>Your privacy is important to us. Please read our <a href=\"https://swarmauri.com/privacy-policy/\" data-type=\"page\" data-id=\"21\">Privacy Policy</a> to understand how we handle your personal information.</p>\n",
    "date": "2024-09-01T21:14:52",
    "modified": "2024-09-01T23:53:00",
    "categories": [],
    "tags": [],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "page",
    "wpId": 136,
    "slug": "docs",
    "legacyPath": "/docs/",
    "canonicalUrl": "https://swarmauri.com/docs/",
    "title": "Swarmauri",
    "excerptHtml": "<p>Get the Docs In today&#8217;s rapidly evolving technological landscape, having robust, adaptable, and well-documented software development kits (SDKs) is paramount. Enter Swarmauri – a groundbreaking SDK designed to elevate your development experience by providing a powerful suite of tools for building scalable, efficient, and intelligent systems. To help you navigate and maximize the potential of [&hellip;]</p>\n",
    "contentHtml": "\n<h3 class=\"wp-block-heading\">Get the Docs</h3>\n\n\n\n<p>In today&#8217;s rapidly evolving technological landscape, having robust, adaptable, and well-documented software development kits (SDKs) is paramount. Enter Swarmauri – a groundbreaking SDK designed to elevate your development experience by providing a powerful suite of tools for building scalable, efficient, and intelligent systems. To help you navigate and maximize the potential of Swarmauri, we proudly present our <a href=\"https://doc.swarmauri.com\" data-type=\"link\" data-id=\"https://docs.swarmauri.com/index.html\">documentation hub</a>.</p>\n\n\n\n<h4 class=\"wp-block-heading\">Why Swarmauri?</h4>\n\n\n\n<p>Swarmauri stands out in the crowded field of SDKs due to its unique focus on:</p>\n\n\n\n<ol class=\"wp-block-list\">\n<li><strong>Modularity and Scalability:</strong>&nbsp;With Swarmauri, you can easily build modular applications that are both scalable and maintainable.</li>\n\n\n\n<li><strong>Integration Capabilities:</strong>&nbsp;Swarmauri supports seamless integration with various technologies, empowering you to create complex, distributed systems with ease.</li>\n\n\n\n<li><strong>Advanced Tools:</strong>&nbsp;From sophisticated natural language processing tools to powerful data chunkers and embeddings, Swarmauri equips developers with NLP and Data Analytical functionalities to solve real-world problems efficiently.</li>\n</ol>\n\n\n\n<h4 class=\"wp-block-heading\">Navigating Swarmauri Documentation</h4>\n\n\n\n<p>Our documentation is meticulously crafted to cater to a wide range of users – from beginners to advanced developers, open-source contributors, backend engineers, and solution architects. Here&#8217;s what you can expect from our documentation:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li><strong>Getting Started Guides:</strong>&nbsp;These guides help you kickstart your journey with Swarmauri, covering installation steps, initial configuration, and basic usage.</li>\n\n\n\n<li><strong>In-Depth Tutorials:</strong>&nbsp;For those looking to delve deeper, we offer tutorials that explore various facets of the SDK.</li>\n\n\n\n<li><strong>API References:</strong>&nbsp;Detailed API documentation ensures you have all the information at your fingertips, enabling you to leverage Swarmauri&#8217;s full potential.</li>\n\n\n\n<li><strong>Component Walkthroughs:</strong>&nbsp;Understand how to effectively use and extend Swarmauri&#8217;s diverse components, from parsers and chunkers to embeddings and metrics.</li>\n\n\n\n<li><strong>Advanced Topics:</strong>&nbsp;For seasoned developers and architects, our documentation covers advanced topics such as designing scalable architectures, implementing high-availability systems, and optimizing performance.</li>\n</ul>\n\n\n\n<h4 class=\"wp-block-heading\">How to Access</h4>\n\n\n\n<p>To explore the full range of our documentation, simply visit&nbsp;<a href=\"https://docs.swarmauri.com/index.html\" target=\"_blank\" rel=\"noreferrer noopener\">docs.swarmauri.com</a>. This hub serves as your one-stop destination for all things Swarmauri, providing structured, easy-to-navigate content that caters to your specific needs.</p>\n\n\n\n<h4 class=\"wp-block-heading\">Join the Swarmauri Community</h4>\n\n\n\n<p>Swarmauri is more than just an SDK – it&#8217;s a community of innovators and problem-solvers. We encourage you to:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li><strong>Contribute:</strong>&nbsp;Our open-source ecosystem thrives on contributions from developers like you. Whether it&#8217;s fixing bugs, adding features, or improving documentation, your input is valuable.</li>\n\n\n\n<li><strong>Collaborate:</strong>&nbsp;Connect with other Swarmauri users, share your experiences, and collaborate on projects to push the boundaries of what&#8217;s possible.</li>\n</ul>\n\n\n\n<h4 class=\"wp-block-heading\">Conclusion</h4>\n\n\n\n<p>The Swarmauri documentation hub is designed to empower you with the knowledge and tools necessary to harness the full potential of our SDK. Whether you&#8217;re just starting out or are an experienced developer, our documentation provides the resources you need to build robust, scalable, and intelligent systems. Dive into the&nbsp;<a href=\"https://docs.swarmauri.com/index.html\" target=\"_blank\" rel=\"noreferrer noopener\">Swarmauri documentation</a>&nbsp;today and begin your journey towards unparalleled development excellence.</p>\n\n\n\n<p>© 2023 Swarmauri. All rights reserved.</p>\n",
    "date": "2024-09-25T07:51:03",
    "modified": "2025-05-01T00:45:45",
    "categories": [],
    "tags": [],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "page",
    "wpId": 81,
    "slug": "faq",
    "legacyPath": "/faq/",
    "canonicalUrl": "https://swarmauri.com/faq/",
    "title": "faq",
    "excerptHtml": "<p>Q: Where can I see Swarmauri&#8217;s code?A: Clone the repository from GitHub Q: How do I install Swarmauri?A: Q: What are the prerequisites for installing Swarmauri?A: Ensure you have Python, pip, and other dependencies installed before installing Swarmauri. Q: How can I contribute to Swarmauri?A: Contribute to Swarmauri by: Q: Where can I watch videos [&hellip;]</p>\n",
    "contentHtml": "\n<p>Q: Where can I see Swarmauri&#8217;s code?<br>A: Clone the repository from <a href=\"https://github.com/swarmauri/swarmauri-sdk\" data-type=\"link\" data-id=\"https://github.com/swarmauri/swarmauri-sdk\">GitHub</a><br><br>Q: How do I install Swarmauri?<br>A:</p>\n\n\n\n<pre class=\"wp-block-code has-primary-color has-secondary-background-color has-text-color has-background has-link-color wp-elements-467ef3ae660096915d1b75c9f14e028d\"><code>pip install swarmauri&#91;full]==0.4.1</code></pre>\n\n\n\n<p>Q: What are the prerequisites for installing Swarmauri?<br>A: Ensure you have Python, pip, and other dependencies installed before installing Swarmauri.</p>\n\n\n\n<p>Q: How can I contribute to Swarmauri?<br>A: Contribute to Swarmauri by:</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Reporting issues on <a href=\"https://github.com/swarmauri/swarmauri-sdk\" data-type=\"link\" data-id=\"https://github.com/swarmauri/swarmauri-sdk\">GitHub</a></li>\n\n\n\n<li>Submitting pull requests for new features or bug fixes</li>\n\n\n\n<li>Participating in discussions on our community forum</li>\n</ul>\n\n\n\n<p><br>Q: Where can I watch videos and tutorials on using Swarmauri?<br>A: Watch videos and tutorials on:<br></p>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Our official <a href=\"https://www.youtube.com/@swarmauri\">YouTube channel</a></li>\n\n\n\n<li>Our website&#8217;s <a href=\"https://docs.swarmauri.com/index.html\">tutorial section</a></li>\n\n\n\n<li>Our community forum&#8217;s <a href=\"https://www.linkedin.com/company/swarmauri\">video section</a></li>\n</ul>\n\n\n\n<p>Q: Are there any step-by-step guides available?<br>A: Yes, check our website&#8217;s documentation section for step-by-step guides and tutorials.</p>\n\n\n\n<p>Q: Where can I find more information about Swarmauri?<br>A: Yes, join our <a href=\"https://discord.gg/CgQnFAUh\">Discord </a>community forum to discuss Swarmauri with other users and developers.</p>\n\n\n\n<p></p>\n",
    "date": "2024-09-01T23:44:37",
    "modified": "2024-09-02T14:40:05",
    "categories": [],
    "tags": [],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "page",
    "wpId": 21,
    "slug": "privacy-policy",
    "legacyPath": "/privacy-policy/",
    "canonicalUrl": "https://swarmauri.com/privacy-policy/",
    "title": "Privacy Policy",
    "excerptHtml": "",
    "contentHtml": "",
    "date": "2024-09-01T21:14:21",
    "modified": "2024-09-01T21:25:00",
    "categories": [],
    "tags": [],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "page",
    "wpId": 220,
    "slug": "services-and-solutions",
    "legacyPath": "/services-and-solutions/",
    "canonicalUrl": "https://swarmauri.com/services-and-solutions/",
    "title": "Services &amp; Solutions",
    "excerptHtml": "<p>Empower Your Business Through Tailored Solutions At Swarmauri, we specialize in crafting custom software, delivering AI-driven insights, building intelligent cloud platforms, and providing innovative design services. Our comprehensive technology solutions simplify complexity, boost performance, and accelerate your innovation journey. Our Core Services Custom Software Development Quality Assurance &amp; Testing Architecture &amp; Design Cloud &amp; Platform [&hellip;]</p>\n",
    "contentHtml": "\n<h6 class=\"wp-block-heading has-text-align-center\">Empower Your Business Through Tailored Solutions</h6>\n\n\n\n<p>At Swarmauri, we specialize in crafting custom software, delivering AI-driven insights, building intelligent cloud platforms, and providing innovative design services. Our comprehensive technology solutions simplify complexity, boost performance, and accelerate your innovation journey.</p>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<h2 class=\"wp-block-heading\">Our Core Services</h2>\n\n\n\n<h5 class=\"wp-block-heading\">Custom Software Development</h5>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Tailored development of robust, scalable Python and JavaScript applications.</li>\n\n\n\n<li>Modern web frameworks including Vue.js, Svelte, and React to build intuitive and dynamic user experiences.</li>\n</ul>\n\n\n\n<h5 class=\"wp-block-heading\">Quality Assurance &amp; Testing</h5>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Implement rigorous Test-driven Development (TDD) methodologies.</li>\n\n\n\n<li>Automated and manual testing services ensuring your software is reliable and high-quality.</li>\n</ul>\n\n\n\n<h5 class=\"wp-block-heading\">Architecture &amp; Design</h5>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Strategic software architecture to ensure scalable, secure, and maintainable solutions.</li>\n\n\n\n<li>Comprehensive UI/UX and graphic design services that enhance user interaction and brand visibility.</li>\n</ul>\n\n\n\n<h5 class=\"wp-block-heading\">Cloud &amp; Platform Solutions</h5>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Cloud-native application development designed for scalability and security.</li>\n\n\n\n<li>Cloud automation and intelligent automation to streamline and optimize your business processes.</li>\n</ul>\n\n\n\n<h5 class=\"wp-block-heading\">AI, ML, and Data Science</h5>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Advanced AI and machine learning consulting, integration, and orchestration.</li>\n\n\n\n<li>Data science analytics services transforming data into actionable insights.</li>\n\n\n\n<li>Specialized LLM (Large Language Model) integration and orchestration to enhance your applications.</li>\n</ul>\n\n\n\n<h5 class=\"wp-block-heading\">Software Staffing</h5>\n\n\n\n<ul class=\"wp-block-list\">\n<li>Flexible staff augmentation to rapidly scale your teams with top talent.</li>\n\n\n\n<li>Dedicated technical teams tailored specifically to your project requirements.</li>\n\n\n\n<li>Expertise available across all major roles including Developers, QA specialists, UI/UX designers, and Project Managers.</li>\n</ul>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<h2 class=\"wp-block-heading\">Why Choose Swarmauri?</h2>\n\n\n\n<ul class=\"wp-block-list\">\n<li><strong>Expertise</strong>: Highly skilled professionals with extensive industry experience.</li>\n\n\n\n<li><strong>Innovation</strong>: Commitment to innovative solutions aligned with your business goals.</li>\n\n\n\n<li><strong>Quality</strong>: Proven methodologies ensuring excellence and reliability in every delivery.</li>\n\n\n\n<li><strong>Partnership</strong>: Collaborative approach ensuring seamless integration with your business.</li>\n</ul>\n\n\n\n<hr class=\"wp-block-separator has-alpha-channel-opacity\"/>\n\n\n\n<h2 class=\"wp-block-heading\">Get Started Today</h2>\n\n\n\n<p>Ready to accelerate your innovation journey?</p>\n\n\n\n<p><a href=\"https://swarmauri.com/?page_id=216\" data-type=\"page\" data-id=\"216\"><strong>Schedule a Consultation</strong></a> or <a href=\"mailto:jacob@swarmauri.com\"><strong>Contact Our Team</strong></a> to learn more.</p>\n\n\n\n<p></p>\n",
    "date": "2025-05-03T07:11:01",
    "modified": "2025-05-03T07:12:30",
    "categories": [],
    "tags": [],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  },
  {
    "wpType": "page",
    "wpId": 34,
    "slug": "terms-of-service",
    "legacyPath": "/terms-of-service/",
    "canonicalUrl": "https://swarmauri.com/terms-of-service/",
    "title": "Terms of Service",
    "excerptHtml": "",
    "contentHtml": "",
    "date": "2024-09-01T21:24:08",
    "modified": "2024-09-01T21:24:22",
    "categories": [],
    "tags": [],
    "authorId": 1,
    "authorName": "coby",
    "authorSlug": "coby",
    "authorLink": "https://swarmauri.com/author/coby/"
  }
];

export default importedArticles;
