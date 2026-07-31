from agent.react_agent import agent

response = agent.invoke(
    {
        "messages": [
            {
                "role": "user",
                "content": "What documents are uploaded?"
            }
        ]
    }
)

print(response)