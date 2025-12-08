// WIP
#include <iostream>
#include <string>
#include <any>
#include <vector>
#include <ranges>

template <typename T>
struct Node
{
    T value;
    Node *prev;
    Node *next;

    Node(T val) : value(val), next(nullptr), prev(nullptr) {}
};
class LinkedLists
{
private:
    Node head;
    Node tail;
    int length;

public:
    LinkedLists()
    {
        this->head = nullptr;
        this->tail = nullptr;
        this->length = 0;
    }
    template <typename T>
    void push_back(T value)
    {
        Node *NewNode = new Node(value);
        NewNode->value = value;
        if (this->head == nullptr)
        {
            this->head = NewNode;
            this->tail = NewNode;
            NewNode->next = NewNode;
            NewNode->prev = NewNode;
        }
        else
        {
           this->tail->next = NewNode;
           NewNode->prev = this->tail;
           NewNode->next = this->head;
           this->head->prev = NewNode;
           this->tail = NewNode;
        }
        this->length += 1;
    }
    template <typename T>
    void display(void){
        Node CurrentNode = this->head;
        std::vector<T> elements;
        while(true){
            elements.push_back(CurrentNode->value);
            CurrentNode = CurrentNode->next;
            if(CurrentNode == this->head){
                break;
            }
        }
        
        for(int i=0;i< elements.size();i++){
            std::cout << elements[i].value;
        }
    }
};

int main(void)
{
    LinkedLists d;
    d.push_back(34);
    return 0;
}




// WIP