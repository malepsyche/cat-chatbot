export interface TextAnnotation {
    // Define properties of annotations if they exist
  }
  
export interface TextContentBlock {
    type: 'text';
    text: {
      value: string;
      annotations: TextAnnotation[];
    };
  }
  
export interface MessageContent {
    content: TextContentBlock[];
    // Define other properties if there are other content block types
}
  
export interface Message {
    id: string;
    object: string;
    created_at: number;
    assistant_id: string | null;
    thread_id: string;
    run_id: string | null;
    role: 'user' | 'assistant';
    content: MessageContent[];
    file_ids: string[];
    metadata: Record<string, unknown>; // or a more specific type if you know the structure of `metadata`
}