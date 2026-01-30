"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TabsList } from "@/components/ui/tabs";
import { Tabs, TabsTrigger } from "@radix-ui/react-tabs";
import { Ghost } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";

const tabs = ["All", "Completed", "Incomplete"];

export const ToDo = () => {
  const [value, Setvalue] = useState("");
  const [todos, Settodos] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("All");

  return (
    <div className="w-screen h-screen flex justify-center py-10">
      <Card className="w-[377px] h-fit bg-[rgba(255,255,255,1)] flex flex-col items-center gap-[40px]">
        <CardContent className="w-[345px] h-fit flex flex-col items-center p-0 gap-[16px]">
          <CardHeader className="w-[345px] h-[28px] flex text-black justify-center text-[20px] text-inter font-semibold">
            To-Do List
          </CardHeader>
          <CardContent className="w-[345px] h-[38px] p-0 flex flex-row gap-[6px]">
            <input
              type="text"
              id="Searching..."
              name="Searching..."
              required
              minLength={10}
              maxLength={50}
              size={10}
              value={value}
              onChange={(e) => {
                Setvalue(e.target.value);
              }}
              className="w-[280px] h-[38px] pl-[10px] border-[1px] border-black rounded-[10px]"
            ></input>
            <Button
              className="w-[59px] h-[38px]  bg-blue-600 flex justify-center items-center text-[14px] text-inter font-normal text-white"
              onClick={() => {
                Settodos([
                  ...todos,
                  {
                    id: nanoid(),
                    isDone: false,
                    text: value,
                  },
                ]);
                Setvalue("");
              }}
            >
              Add
            </Button>
          </CardContent>

          <Tabs
            defaultValue="All"
            className="w-[345px] h-[32px] flex flex-row gap-[6px]"
          >
            <TabsList>
              <div className="flex">
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    variant={Ghost}
                    style={{
                      backgroundColor:
                        tab === selectedBtn
                          ? "rgba(60, 130, 246, 1)"
                          : "transparent",
                    }}
                    onClick={() => {
                      setSelectedBtn(tab);
                    }}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <CardContent className="w-[345px] h-[17px] text-[14px] text-inter font-normal text-[rgba(107,114,128,1)] flex justify-center items-center mt-[20px]">
            No tasks yet. Add one above!
          </CardContent>
          <CardContent className="flex flex-col gap-[20px]">
            {todos
              .filter((items) => {
                if (selectedBtn === "All") return true;
                if (selectedBtn === "Completed") return items.isDone === true;
                return items.isDone === false;
              })
              .map((items) => (
                <Card
                  key={items.id}
                  className="w-[345px] h-[62px] p-[16px] bg-[rgba(249,250,251,1)] flex flex-row gap-[10px] rounded-lg items-center"
                >
                  <Checkbox
                    className="w-[20px] h-[20px]"
                    checked={items.isDone}
                    onClick={() => {
                      const NewTodos = todos.map((todos) => {
                        if (todos.id !== items.id) return todos;
                        return {
                          isDone: !items.isDone,
                          text: items.text,
                          id: items.id,
                        };
                      });
                      Settodos(NewTodos);
                    }}
                  ></Checkbox>
                  <p className="flex-1">{items.text}</p>
                  <Button
                    className="w-[67px] h-[30px] bg-[rgba(254,242,242,1)] text-red-500 p-0"
                    onClick={() => {
                      const NewTodos = todos.filter(
                        (todo) => todo.id !== items.id
                      );
                      Settodos(NewTodos);
                    }}
                  >
                    Delete
                  </Button>
                </Card>
              ))}
          </CardContent>
        </CardContent>
        <CardFooter className="w-[345px] h-[15px] flex justify-center-safe items-center text-[12px] text-inter font-normal text-[rgba(107,114,128,1)] ">
          Powered By Pinecone Academy
        </CardFooter>
      </Card>
    </div>
  );
};
