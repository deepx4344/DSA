#include <iostream>
template <typename T>
struct Node
{
    T value;
    Node<T> *prev;
    Node<T> *next;

    Node(T val) : value(val), next(nullptr), prev(nullptr) {}
};
template <typename T>
class LinkedLists
{
private:
    Node<T> *head;
    Node<T> *tail;
    int length;
    Node<T> *get_node(const size_t index)
    {
        check_valid_index(index);
        Node<T> *current_node = this->head;
        if (index == 0)
        {
            return current_node;
        }
        for (int i = 0; i < index; i++)
        {
            current_node = current_node->next;
        }
        return current_node;
    }

public:
    LinkedLists()
    {
        this->head = nullptr;
        this->tail = nullptr;
        this->length = 0;
    }
    bool check_valid_index(const size_t &index)
    {
        if (index < 0 || index > this->length - 1)
        {
            throw std::out_of_range("Index Out Of Range");
        }
        return true;
    }
    void push_back(const T &value)
    {
        Node<T> *new_node = new Node(value);
        if (this->head == nullptr)
        {
            this->head = new_node;
            this->tail = new_node;
            new_node->next = new_node;
            new_node->prev = new_node;
        }
        else
        {
            this->tail->next = new_node;
            new_node->prev = this->tail;
            new_node->next = this->head;
            this->head->prev = new_node;
            this->tail = new_node;
        }
        this->length++;
    }
    void display(void)
    {
        Node<T> *current_node = this->head;
        if (current_node == nullptr)
        {
            std::cout << "List is Empty";
            return;
        }
        do
        {
            std::cout << current_node->value;
            current_node = current_node->next;
            if (current_node != this->head)
            {
                std::cout << " <==> ";
            }
        } while (current_node != this->head);
        std::cout << std::endl;
    }
    void insert(const T &value, const size_t &index)
    {

        if (index == this->length || this->head == nullptr)
        {
            push_back(value);
            return;
        }
        Node<T> *new_node = new Node(value);
        if (index == 0)
        {
            Node<T> *head = this->head;
            Node<T> *tail = this->tail;
            new_node->next = head;
            new_node->prev = tail;
            head->prev = new_node;
            tail->next = new_node;
            this->head = new_node;
            this->length++;
            return;
        }
        Node<T> *node_in_index = get_node(index);
        Node<T> *prev_node = node_in_index->prev;
        node_in_index->prev = new_node;
        prev_node->next = new_node;
        new_node->next = node_in_index;
        new_node->prev = prev_node;
        this->length++;
    }
    int getNodeIndex(const T &value)
    {
        int count = 0;
        if (this->head == nullptr)
        {
            throw std::out_of_range("Cannot get from empty list");
        };
        if (this->head->value == value)
            return count;
        bool found = false;
        Node<T> *cur = this->head->next;
        while (true)
        {
            count++;
            if (cur->value == value)
            {
                found = true;
                break;
            }
            if (cur == this->head)
            {
                break;
            }
            cur = cur->next;
        }
        if (!found)
            return -1;
        return count;
    }
    bool contains(const T &value)
    {
        bool found = false;
        if (this->head == nullptr)
            return found;
        Node<T> *cur = this->head;
        while (true)
        {
            if (cur->value == value)
            {
                found = true;
                break;
            }
            cur = cur->next;
            if (cur == this->head)
            {
                break;
            }
        }
        return found;
    }
    void delete_by_index(const size_t &index)
    {
        check_valid_index(index);
        if (index == 0)
        {
            Node<T> *next_node = this->head->next;
            next_node->prev = this->tail;
            this->tail->next = next_node;
            delete (this->head);
            this->head = next_node;
            this->length--;
            return;
        }
        if (index == this->length - 1)
        {
            Node<T> *prev_node = this->tail->prev;
            prev_node->next = this->head;
            this->head->prev = prev_node;
            delete (this->tail);
            this->tail = prev_node;
            this->length--;
            return;
        }
        Node<T> *node_in_index = get_node(index);
        Node<T> *next_node = get_node(index + 1);
        Node<T> *prev_node = get_node(index - 1);
        delete (node_in_index);
        next_node->prev = prev_node;
        prev_node->next = next_node;
        this->length--;
    }
    int size()
    {
        return this->length;
    }
};

int main(void)
{
    LinkedLists<int> dop;
    dop.push_back(34);
    dop.push_back(45);
    dop.push_back(98);
    dop.push_back(88);
    dop.display();
    dop.insert(77, 2);
    dop.display();
    dop.insert(67, 0);
    dop.display();
    std::cout << dop.getNodeIndex(34) << std::endl;
    std::cout << dop.getNodeIndex(45) << std::endl;
    std::cout << dop.getNodeIndex(98) << std::endl;
    std::cout << dop.getNodeIndex(88) << std::endl;
    std::cout << dop.getNodeIndex(77) << std::endl;
    std::cout << dop.getNodeIndex(988) << std::endl;
    std::cout << dop.contains(988) << std::endl;
    dop.delete_by_index(2);
    dop.display();
    dop.delete_by_index(0);
    dop.display();
    dop.delete_by_index(3);
    dop.display();
    std::cout << dop.size() << std::endl;
    return 0;
}